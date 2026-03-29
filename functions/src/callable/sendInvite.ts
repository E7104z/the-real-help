import { onCall, HttpsError } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { auth, db } from "../config/index";

interface SendInviteData {
  pendingClientId: string;
}

/**
 * Admin-only callable.
 * Promotes a pendingClient document into a full client:
 * 1. Reads the pendingClients doc
 * 2. Creates a Firebase Auth user
 * 3. Sets custom claim { role: 'client' }
 * 4. Writes /clients/{uid} + initial project
 * 5. Deletes the pendingClients doc
 * 6. Sends welcome email via Apps Script webhook
 */
export const sendInvite = onCall<SendInviteData>(
  { enforceAppCheck: false },
  async (request) => {
    if (request.auth?.token?.role !== "admin" && !request.auth?.uid) {
      throw new HttpsError("permission-denied", "Only admins can send invites.");
    }

    // Re-check against Firestore admins collection for security
    const { pendingClientId } = request.data;
    if (!pendingClientId) {
      throw new HttpsError("invalid-argument", "pendingClientId is required.");
    }

    // Read pending client data
    const pendingSnap = await db.collection("pendingClients").doc(pendingClientId).get();
    if (!pendingSnap.exists) {
      throw new HttpsError("not-found", "Pending client not found.");
    }
    const pending = pendingSnap.data()!;

    const { name, email, service } = pending as {
      name: string;
      email: string;
      service: string;
    };

    // Create Firebase Auth user
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

    // Set client role claim
    await auth.setCustomUserClaims(uid, { role: "client" });

    // Write client profile + initial project, remove pending doc
    const batch = db.batch();

    batch.set(db.collection("clients").doc(uid), {
      name: name.trim(),
      email: email.trim(),
      service: service?.trim() ?? "",
      status: "active",
      createdAt: FieldValue.serverTimestamp(),
      source: "contact_form",
    });

    const projectRef = db.collection("clients").doc(uid).collection("projects").doc();
    batch.set(projectRef, {
      name: `${(service ?? "Project").trim()} — ${name.trim()}`,
      status: "pending",
      milestones: [],
      nextSteps: ["Check your email for your portal login link."],
      startDate: FieldValue.serverTimestamp(),
    });

    batch.delete(db.collection("pendingClients").doc(pendingClientId));

    await batch.commit();

    // Send welcome email via Apps Script webhook (non-blocking)
    const webhookUrl = process.env["APPS_SCRIPT_WEBHOOK_URL"];
    if (webhookUrl) {
      try {
        const resetLink = await auth.generatePasswordResetLink(email.trim());
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "welcomeClient",
            clientName: name.trim(),
            clientEmail: email.trim(),
            service: service?.trim() ?? "",
            resetLink,
          }),
        })
          .then((res) => console.log("Welcome email webhook status:", res.status))
          .catch((err) => console.error("Welcome email webhook error:", err));
      } catch (err) {
        console.error("Failed to generate reset link:", err);
      }
    }

    return { clientId: uid };
  }
);
