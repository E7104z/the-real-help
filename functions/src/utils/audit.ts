import { db } from "../config";
import { FieldValue } from "firebase-admin/firestore";
import type { AuditLogEntry } from "../types";

export async function writeAuditLog(
  entry: Omit<AuditLogEntry, "timestamp">
): Promise<string> {
  const ref = db
    .collection("tenants")
    .doc(entry.tenantId)
    .collection("auditLogs")
    .doc();

  await ref.set({
    ...entry,
    timestamp: FieldValue.serverTimestamp(),
  });

  return ref.id;
}
