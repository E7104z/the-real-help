import { onCall, HttpsError } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../config/index";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

/**
 * Public callable — receives contact form submissions, saves the lead to
 * Firestore, then fires the Google Apps Script webhook (non-blocking).
 *
 * Required env var (set in functions/.env):
 *   APPS_SCRIPT_WEBHOOK_URL=<your deployed Apps Script web app URL>
 */
export const submitContactForm = onCall<ContactFormData>(
  { cors: true },
  async (request) => {
    const { data } = request;

    // Input validation
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      throw new HttpsError("invalid-argument", "Name, email, and message are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new HttpsError("invalid-argument", "Invalid email address.");
    }

    // Save lead to Firestore
    console.log("Saving lead for:", data.email);
    const docRef = await db.collection("leads").add({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() ?? "",
      service: data.service?.trim() ?? "",
      message: data.message.trim(),
      status: "New",
      source: "Website",
      createdAt: FieldValue.serverTimestamp(),
      followUpSent: false,
    });
    console.log("Lead saved, id:", docRef.id);

    // Also write to pendingClients so they surface in admin portal
    await db.collection("pendingClients").doc(docRef.id).set({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() ?? "",
      service: data.service?.trim() ?? "",
      message: data.message.trim(),
      status: "pending",
      source: "contact_form",
      createdAt: FieldValue.serverTimestamp(),
    });

    // Call Apps Script webhook — fire and forget, never block the response
    const webhookUrl = process.env["APPS_SCRIPT_WEBHOOK_URL"];
    console.log("Webhook URL present:", !!webhookUrl);
    if (webhookUrl) {
      const payload = {
        leadId: docRef.id,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() ?? "",
        service: data.service?.trim() ?? "",
        message: data.message.trim(),
      };

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => console.log("Webhook response status:", res.status))
        .catch((err) => console.error("Apps Script webhook error:", err));
    } else {
      console.warn("APPS_SCRIPT_WEBHOOK_URL not set — skipping webhook.");
    }

    return { success: true, leadId: docRef.id };
  }
);
