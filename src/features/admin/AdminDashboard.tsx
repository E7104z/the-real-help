import { Users, FileText, Activity, Shield, UserCog } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

const ADMIN_STATS = [
  { label: 'Total Users', icon: Users, value: '—' },
  { label: 'Total Records', icon: FileText, value: '—' },
  { label: 'Active Workflows', icon: Activity, value: '—' },
  { label: 'Audit Events', icon: Shield, value: '—' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-brand-black">Admin Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className="rounded-lg bg-brand-blue-50 p-3 text-brand-blue-500">
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
        <CardTitle>Quick Actions</CardTitle>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={ROUTES.ADMIN_CLIENTS}
            className="flex items-center gap-2 rounded-xl bg-brand-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors"
          >
            <UserCog className="h-4 w-4" />
            Manage Clients
          </Link>
        </div>
      </Card>
    </div>
  );
}
