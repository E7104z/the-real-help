import type { Timestamp } from 'firebase/firestore';

export interface AuditLog {
  id: string;
  tenantId: string;
  actorUserId: string;
  actorRole: string;
  action: string;
  targetCollection: string;
  targetId: string;
  beforeSummary: Record<string, unknown> | null;
  afterSummary: Record<string, unknown> | null;
  /** Null until the server timestamp resolves. */
  timestamp?: Timestamp | null;
}

export interface FileRecord {
  id: string;
  tenantId: string;
  ownerId: string;
  fileName: string;
  fileType: string;
  path: string;
  downloadUrl?: string;
  sizeBytes: number;
  /** Null until the server timestamp resolves. */
  createdAt?: Timestamp | null;
  createdBy: string;
  status: string;
  linkedRecordIds: string[];
}

export interface PaginationState {
  pageSize: number;
  currentPage: number;
  hasMore: boolean;
}
