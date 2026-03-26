import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { useDocument } from '@/hooks/useFirestore';
import { useTenant } from '@/hooks/useTenant';
import { formatDateTime } from '@/lib/utils/formatters';
import type { TenantRecord } from '@/types/records';

export default function RecordDetailPage() {
  const { recordId } = useParams<{ recordId: string }>();
  const { tenantId } = useTenant();

  const { data: record, loading, error } = useDocument<TenantRecord>(
    tenantId ?? '',
    'records',
    recordId,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="space-y-4">
        <Link to="/app/records" className="inline-flex items-center gap-1 text-sm text-accent-blue hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Records
        </Link>
        <Card>
          <p className="text-status-error">{error ?? 'Record not found.'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/app/records" className="text-brand-silver-500 hover:text-brand-black transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-brand-black">
            {record.displayName}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <Badge>{record.statusLabel || record.status}</Badge>
            <span className="text-sm text-brand-silver-500">
              Owner: {record.ownerName}
            </span>
          </div>
        </div>
        <Button>Edit Record</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Details</CardTitle>
          <p className="text-brand-silver-600">{record.summary || 'No summary provided.'}</p>
        </Card>

        <Card>
          <CardTitle>Metadata</CardTitle>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-brand-silver-500">Created</dt>
              <dd className="font-medium">{record.createdAt ? formatDateTime(record.createdAt) : '—'}</dd>
            </div>
            <div>
              <dt className="text-brand-silver-500">Last Updated</dt>
              <dd className="font-medium">{record.lastUpdatedAt ? formatDateTime(record.lastUpdatedAt) : '—'}</dd>
            </div>
            <div>
              <dt className="text-brand-silver-500">ID</dt>
              <dd className="font-mono text-xs text-brand-silver-400">{record.id}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
