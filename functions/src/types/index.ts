export interface AuditLogEntry {
  tenantId: string;
  actorUserId: string;
  actorRole: string;
  action: string;
  targetCollection: string;
  targetId: string;
  beforeSummary: Record<string, unknown> | null;
  afterSummary: Record<string, unknown> | null;
  timestamp: FirebaseFirestore.FieldValue;
}

export interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  tenantId: string;
  createdAt: FirebaseFirestore.FieldValue;
}

export type UserRole = "admin" | "staff" | "user";
