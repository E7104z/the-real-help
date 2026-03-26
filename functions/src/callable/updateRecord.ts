import { onCall, HttpsError } from "firebase-functions/v2/https";
import { FieldValue } from "firebase-admin/firestore";
import { tenantCollection } from "../utils/firestoreHelpers";
import { writeAuditLog } from "../utils/audit";

interface UpdateRecordRequest {
  tenantId: string;
  recordId: string;
  updates: Record<string, unknown>;
}

/**
 * Privileged record update — validates caller role, applies updates,
 * and writes an audit log entry.
 */
export const updateRecord = onCall<UpdateRecordRequest>(async (request) => {
  const { auth, data } = request;

  if (!auth) {
    throw new HttpsError("unauthenticated", "Must be signed in.");
  }

  const callerRole = auth.token["role"] as string | undefined;
  const callerTenant = auth.token["tenantId"] as string | undefined;

  if (!callerTenant || callerTenant !== data.tenantId) {
    throw new HttpsError("permission-denied", "Tenant mismatch.");
  }

  if (callerRole !== "admin" && callerRole !== "staff") {
    throw new HttpsError("permission-denied", "Insufficient role.");
  }

  const recordRef = tenantCollection(data.tenantId, "records").doc(data.recordId);
  const beforeSnap = await recordRef.get();

  if (!beforeSnap.exists) {
    throw new HttpsError("not-found", "Record not found.");
  }

  const beforeData = beforeSnap.data() ?? {};

  await recordRef.update({
    ...data.updates,
    lastUpdatedAt: FieldValue.serverTimestamp(),
    lastUpdatedBy: auth.uid,
  });

  await writeAuditLog({
    tenantId: data.tenantId,
    actorUserId: auth.uid,
    actorRole: callerRole,
    action: "record.update",
    targetCollection: "records",
    targetId: data.recordId,
    beforeSummary: { status: beforeData["status"], displayName: beforeData["displayName"] },
    afterSummary: data.updates,
  });

  return { success: true };
});
