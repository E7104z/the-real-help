import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { writeAuditLog } from "../utils/audit";

/**
 * Example Firestore trigger that auto-generates an audit log
 * whenever a record's status field changes.
 */
export const onRecordStatusChange = onDocumentWritten(
  "tenants/{tenantId}/records/{recordId}",
  async (event) => {
    const beforeData = event.data?.before?.data();
    const afterData = event.data?.after?.data();
    const { tenantId, recordId } = event.params;

    // Only fire on updates, not creates or deletes for this trigger
    if (!beforeData || !afterData) return;

    const oldStatus = beforeData["status"] as string | undefined;
    const newStatus = afterData["status"] as string | undefined;

    if (oldStatus === newStatus) return;

    await writeAuditLog({
      tenantId,
      actorUserId: (afterData["lastUpdatedBy"] as string) ?? "system",
      actorRole: "system",
      action: "record.status_change",
      targetCollection: "records",
      targetId: recordId,
      beforeSummary: { status: oldStatus },
      afterSummary: { status: newStatus },
    });
  }
);
