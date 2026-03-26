import { format, formatDistanceToNow } from 'date-fns';
import type { Timestamp } from 'firebase/firestore';

export function formatDate(date: Date | Timestamp): string {
  const d = 'toDate' in date ? date.toDate() : date;
  return format(d, 'MMM d, yyyy');
}

export function formatDateTime(date: Date | Timestamp): string {
  const d = 'toDate' in date ? date.toDate() : date;
  return format(d, 'MMM d, yyyy h:mm a');
}

export function formatRelative(date: Date | Timestamp): string {
  const d = 'toDate' in date ? date.toDate() : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = sizes[i];
  if (!size) return `${bytes} B`;
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${size}`;
}
