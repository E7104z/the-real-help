import { onCall, HttpsError } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { auth, db } from "../config/index";

interface CreateClientData {
  name: string;
  email: string;
  service: string;
}

/**
 * Admin-only callable.
 * 1. Creates a Firebase Auth user
 * 2. Sets custom claim { role: 'client' }
 * 3. Writes /clients/{uid} profile + initial project
 * 4. Generates a password-reset link and fires the Apps Script webhook
 *    to send the client a welcome email with their setup link.
 */
export const createClient = onCall<CreateClientData>(
  { enforceAppCheck: false },
  async (request) => {
    // Only admins may call this
    if (request.auth?.token?.role !== "admin") {
      throw new HttpsError("permission-denied", "Only admins can create clients.");
    }

    const { name, email, service } = request.data;

    if (!name?.trim() || !email?.trim() || !service?.trim()) {
      throw new HttpsError("invalid-argument", "name, email, and service are required.");
    }

    // 1. Create auth user
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email: email.trim(),
        displayName: name.trim(),
      });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-exists") {
        throw new HttpsError("already-exists", "A user with that email already exists.");
      }
      throw new HttpsError("internal", "Failed to create user account.");
    }

    const uid = userRecord.uid;

    // 2. Set client role claim
    await auth.setCustomUserClaims(uid, { role: "client" });

    // 3. Write client profile + initial project
    const batch = db.batch();

    batch.set(db.collection("clients").doc(uid), {
      name: name.trim(),
      email: email.trim(),
      service: service.trim(),
      status: "active",
      createdAt: FieldValue.serverTimestamp(),
    });

    const projectRef = db.collection("clients").doc(uid).collection("projects").doc();
    batch.set(projectRef, {
      name: `${service.trim()} — ${name.trim()}`,
      status: "pending",
      milestones: [],
      nextSteps: ["Check your email for your portal login link."],
      startDate: FieldValue.serverTimestamp(),
    });

    await batch.commit();

    // 4. Generate password reset link & send welcome email
    const webhookUrl = process.env.APPS_SCRIPT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const resetLink = await auth.generatePasswordResetLink(email.trim());
        const payload = {
          type: "welcomeClient",
          clientName: name.trim(),
          clientEmail: email.trim(),
          service: service.trim(),
          resetLink,
        };
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Non-fatal — client was created, just log the failure
        console.error("Welcome email webhook failed:", err);
      }
    }

    return { clientId: uid };
  }
);
