import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { FieldValue } from "firebase-admin/firestore";
import fetch from "node-fetch";
import { db as _db } from "../config/index";

const WEBHOOK_URL = process.env["APPS_SCRIPT_PROPERTY_TRANSFER_URL"] ?? "";

export const onPropertyTransferCreated = onDocumentCreated(
  {
    document: "propertyTransfers/{transferId}",
    serviceAccount: "firebase-adminsdk-fbsvc@the-real-help.iam.gserviceaccount.com",
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const transferId = event.params["transferId"];
    const data = snap.data();

    console.log(`New property transfer: ${transferId}`);
    console.log(`Client: ${data["clientName"]}, Properties: ${(data["properties"] as unknown[]).length}`);

    if (!WEBHOOK_URL) {
      console.warn("APPS_SCRIPT_PROPERTY_TRANSFER_URL not set — skipping webhook");
      await snap.ref.update({
        status: "pending",
        error: "Webhook URL not configured",
        processedAt: FieldValue.serverTimestamp(),
      });
      return;
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, transferId }),
      });

      const result = await response.json() as { success: boolean; documents?: { propertyAddress: string; deedUrl: string }[]; error?: string };

      if (result.success) {
        await snap.ref.update({
          status: "processing",
          documentsGenerated: true,
          documentURLs: result.documents ?? [],
          processedAt: FieldValue.serverTimestamp(),
        });
        console.log(`✅ Deeds generated for ${transferId}`);
      } else {
        await snap.ref.update({
          status: "error",
          error: result.error ?? "Unknown error from Apps Script",
          processedAt: FieldValue.serverTimestamp(),
        });
        console.error(`❌ Apps Script error: ${result.error}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Webhook error:", message);
      await snap.ref.update({
        status: "error",
        error: message,
        processedAt: FieldValue.serverTimestamp(),
      });
    }
  }
);
