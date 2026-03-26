import { Users, FileText, Activity, Shield } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';

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
        <p className="text-sm text-brand-silver-500">
          Admin actions and management tools will appear here. All workflow-changing actions
          are routed through Cloud Functions for validation and audit logging.
        </p>
      </Card>
    </div>
  );
}
