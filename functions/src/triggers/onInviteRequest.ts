import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { auth, db } from "../config/index";

/**
 * Firestore trigger — fires when admin writes to inviteRequests/{requestId}.
 * Handles both "Send Invite" (from pending contact form lead) and
 * "Add Client" (direct manual add) via the same path.
 *
 * This pattern bypasses the Cloud Run public-invoker IAM restriction
 * (org policy blocks allUsers on Cloud Run services in this project).
 */
export const onInviteRequest = onDocumentCreated(
  {
    document: "inviteRequests/{requestId}",
    serviceAccount: "firebase-adminsdk-fbsvc@the-real-help.iam.gserviceaccount.com",
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data() as {
      pendingClientId?: string;
      name?: string;
      email?: string;
      service?: string;
      requestedBy?: string;
    };

    let name: string;
    let email: string;
    let service: string;
    const pendingClientId = data.pendingClientId;

    try {
      if (pendingClientId) {
        // "Send Invite" flow: read data from pendingClients doc
        const pendingSnap = await db.collection("pendingClients").doc(pendingClientId).get();
        if (!pendingSnap.exists) {
          await snap.ref.update({ status: "error", error: "Pending client not found." });
          return;
        }
        const pending = pendingSnap.data()!;
        name = pending.name as string;
        email = pending.email as string;
        service = (pending.service as string) ?? "";
      } else {
        // "Add Client" direct flow: use data already in the request doc
        name = (data.name ?? "").trim();
        email = (data.email ?? "").trim();
        service = (data.service ?? "").trim();
      }

      if (!name || !email) {
        await snap.ref.update({ status: "error", error: "Name and email are required." });
        return;
      }

      // Create Firebase Auth user
      let uid: string;
      try {
        const userRecord = await auth.createUser({
          email: email.trim(),
          displayName: name.trim(),
        });
        uid = userRecord.uid;
      } catch (err: unknown) {
        const code = (err as { code?: string }).code;
        if (code === "auth/email-already-exists") {
          await snap.ref.update({ status: "error", error: "A user with that email already exists." });
          return;
        }
        throw err;
      }

      await auth.setCustomUserClaims(uid, { role: "client" });

      const batch = db.batch();

      batch.set(db.collection("clients").doc(uid), {
        name: name.trim(),
        email: email.trim(),
        service: service.trim(),
        status: "active",
        createdAt: FieldValue.serverTimestamp(),
        source: pendingClientId ? "contact_form" : "manual",
      });

      const projectRef = db.collection("clients").doc(uid).collection("projects").doc();
      batch.set(projectRef, {
        name: `${(service || "Project").trim()} — ${name.trim()}`,
        status: "pending",
        milestones: [],
        nextSteps: ["Check your email for your portal login link."],
        startDate: FieldValue.serverTimestamp(),
      });

      if (pendingClientId) {
        batch.delete(db.collection("pendingClients").doc(pendingClientId));
      }

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
              service: service.trim(),
              resetLink,
            }),
          })
            .then((res) => console.log("Welcome email webhook status:", res.status))
            .catch((err) => console.error("Welcome email webhook error:", err));
        } catch (err) {
          console.error("Failed to generate password reset link:", err);
        }
      }

      await snap.ref.update({ status: "complete", clientId: uid });
    } catch (err: unknown) {
      console.error("onInviteRequest error:", err);
      const message = err instanceof Error ? err.message : "Internal server error.";
      await snap.ref.update({ status: "error", error: message });
    }
  }
);
