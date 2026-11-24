import { FileText, Download } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { FileUpload } from './FileUpload';
import { useCollection } from '@/hooks/useFirestore';
import { useTenant } from '@/hooks/useTenant';
import { formatRelative, formatFileSize } from '@/lib/utils/formatters';
import type { FileRecord } from '@/types/common';

export default function FilesPage() {
  const { tenantId } = useTenant();
  const { data: files, loading, refresh } = useCollection<FileRecord>({
    tenantId: tenantId ?? '',
    collectionName: 'files',
    pageSize: 50,
  });

  if (!tenantId) {
    return (
      <div className="flex items-center justify-center py-12 text-brand-silver-500">
        No tenant assigned.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-brand-black">Files</h1>

      <Card>
        <CardTitle>Upload File</CardTitle>
        <FileUpload tenantId={tenantId} onUploadComplete={() => void refresh()} />
      </Card>

      <Card padding="none">
        <div className="border-b border-brand-silver-200 p-4">
          <CardTitle>All Files</CardTitle>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : files.length === 0 ? (
          <div className="py-12 text-center text-brand-silver-500">
            No files uploaded yet.
          </div>
        ) : (
          <ul className="divide-y divide-brand-silver-100">
            {files.map((file) => (
              <li key={file.id} className="flex items-center gap-4 px-4 py-3">
                <FileText className="h-8 w-8 text-brand-silver-400" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-brand-black">{file.fileName}</p>
                  <div className="flex items-center gap-2 text-xs text-brand-silver-500">
                    <span>{formatFileSize(file.sizeBytes)}</span>
                    <span>&middot;</span>
                    <span>{file.createdAt ? formatRelative(file.createdAt) : '—'}</span>
                  </div>
                </div>
                <Badge variant="success">{file.status}</Badge>
                {file.downloadUrl ? (
                  <a
                    href={file.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-blue-hover transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
