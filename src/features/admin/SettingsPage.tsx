import { Card, CardTitle } from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-brand-black">Settings</h1>

      <Card>
        <CardTitle>Tenant Configuration</CardTitle>
        <p className="text-sm text-brand-silver-500">
          Organization settings, user management, and role configuration will be available here.
          Changes are processed through Cloud Functions with full audit logging.
        </p>
      </Card>

      <Card>
        <CardTitle>Integrations</CardTitle>
        <p className="text-sm text-brand-silver-500">
          API keys and external service integrations are managed server-side
          and configured through Firebase environment secrets.
        </p>
      </Card>
    </div>
  );
}
