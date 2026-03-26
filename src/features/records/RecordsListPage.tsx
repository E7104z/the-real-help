import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/tables/DataTable';
import { Spinner } from '@/components/ui/Spinner';
import { useCollection } from '@/hooks/useFirestore';
import { useTenant } from '@/hooks/useTenant';
import { formatRelative } from '@/lib/utils/formatters';
import type { TenantRecord } from '@/types/records';

const STATUS_BADGE_MAP: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'default',
  active: 'success',
  pending: 'warning',
  closed: 'error',
  review: 'info',
};

export default function RecordsListPage() {
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data, loading, hasMore, loadMore } = useCollection<TenantRecord>({
    tenantId: tenantId ?? '',
    collectionName: 'records',
    pageSize: 25,
  });

  const filtered = search
    ? data.filter((r) =>
        r.displayName.toLowerCase().includes(search.toLowerCase()) ||
        r.summary?.toLowerCase().includes(search.toLowerCase()),
      )
    : data;

  const columns = [
    {
      key: 'displayName',
      header: 'Name',
      render: (item: TenantRecord) => (
        <span className="font-medium text-brand-black">{item.displayName}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: TenantRecord) => (
        <Badge variant={STATUS_BADGE_MAP[item.status] ?? 'default'}>
          {item.statusLabel || item.status}
        </Badge>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (item: TenantRecord) => (
        <span className="text-brand-silver-600">{item.ownerName}</span>
      ),
    },
    {
      key: 'updated',
      header: 'Last Updated',
      render: (item: TenantRecord) => (
        <span className="text-brand-silver-500">
          {item.lastUpdatedAt ? formatRelative(item.lastUpdatedAt) : '—'}
        </span>
      ),
    },
  ];

  if (!tenantId) {
    return (
      <div className="flex items-center justify-center py-12 text-brand-silver-500">
        No tenant assigned. Contact your administrator.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold text-brand-black">Records</h1>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Record
        </Button>
      </div>

      <Card padding="none">
        <div className="border-b border-brand-silver-200 p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-silver-400" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); }}
              placeholder="Search records..."
              className="pl-9"
            />
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
            onRowClick={(item) => { navigate(`/app/records/${item.id}`); }}
            emptyMessage="No records found."
          />
        )}

        {hasMore && !loading && (
          <div className="border-t border-brand-silver-200 p-4 text-center">
            <Button variant="ghost" onClick={() => void loadMore()}>
              Load More
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
