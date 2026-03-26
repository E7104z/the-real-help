import type { Timestamp } from 'firebase/firestore';

export interface TenantRecord {
  id: string;
  displayName: string;
  status: string;
  statusLabel: string;
  ownerName: string;
  summary: string;
  searchableText: string;
  lastUpdatedAt: Timestamp;
  lastUpdatedBy: string;
  createdAt: Timestamp;
  createdBy: string;
  relatedCounts?: Record<string, number>;
}

export interface RecordFilters {
  status?: string;
  search?: string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}
