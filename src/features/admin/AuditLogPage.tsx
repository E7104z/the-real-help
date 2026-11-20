import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { DataTable } from '@/components/tables/DataTable';
import { useCollection } from '@/hooks/useFirestore';
import { useTenant } from '@/hooks/useTenant';
import { formatDateTime } from '@/lib/utils/formatters';
import type { AuditLog } from '@/types/common';

export default function AuditLogPage() {
  const { tenantId } = useTenant();
  const [search, setSearch] = useState('');

  const { data: logs, loading, hasMore, loadMore } = useCollection<AuditLog>({
    tenantId: tenantId ?? '',
    collectionName: 'auditLogs',
    pageSize: 50,
  });

  const filtered = search
    ? logs.filter(
        (log) =>
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.targetCollection.toLowerCase().includes(search.toLowerCase()) ||
          log.actorUserId.toLowerCase().includes(search.toLowerCase()),
      )
    : logs;

  const columns = [
    {
      key: 'action',
      header: 'Action',
      render: (item: AuditLog) => (
        <Badge variant="info">{item.action}</Badge>
      ),
    },
    {
      key: 'target',
      header: 'Target',
      render: (item: AuditLog) => (
        <span className="font-mono text-xs">
          {item.targetCollection}/{item.targetId}
        </span>
      ),
    },
    {
      key: 'actor',
      header: 'Actor',
      render: (item: AuditLog) => (
        <div>
          <span className="text-sm">{item.actorUserId}</span>
          <span className="ml-2 text-xs text-brand-silver-400 capitalize">({item.actorRole})</span>
        </div>
      ),
    },
    {
      key: 'timestamp',
      header: 'When',
      render: (item: AuditLog) => (
        <span className="text-sm text-brand-silver-500">
          {formatDateTime(item.timestamp)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold text-brand-black">Audit Log</h1>

      <Card padding="none">
        <div className="border-b border-brand-silver-200 p-4">
          <div className="flex items-center gap-4">
            <CardTitle>Activity History</CardTitle>
            <div className="relative ml-auto max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-silver-400" />
              <Input
                value={search}
                onChange={(e) => { setSearch(e.target.value); }}
                placeholder="Search logs..."
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No audit logs found."
          />
        )}

        {hasMore && !loading && (
          <div className="border-t border-brand-silver-200 p-4 text-center">
            <button
              onClick={() => void loadMore()}
              className="text-sm text-accent-blue hover:underline"
            >
              Load More
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
