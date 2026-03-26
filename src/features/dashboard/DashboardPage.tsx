import { LayoutDashboard, FileText, GitBranch, FolderOpen } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/app/providers/AuthProvider';

const STAT_CARDS = [
  { label: 'Records', icon: FileText, value: '—', color: 'text-accent-blue' },
  { label: 'Active Workflows', icon: GitBranch, value: '—', color: 'text-status-success' },
  { label: 'Files', icon: FolderOpen, value: '—', color: 'text-status-warning' },
  { label: 'Overview', icon: LayoutDashboard, value: '—', color: 'text-brand-silver-600' },
];

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-brand-black">
          Welcome back{currentUser?.displayName ? `, ${currentUser.displayName}` : ''}
        </h1>
        <p className="mt-1 text-brand-silver-500">
          Here&apos;s your workspace overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className={`rounded-lg bg-brand-silver-50 p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-brand-silver-500">{stat.label}</p>
              <p className="text-2xl font-bold text-brand-black">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-brand-silver-500">
          Activity feed will appear here once data is connected.
        </p>
      </Card>
    </div>
  );
}
