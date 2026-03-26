import { Card, CardTitle } from '@/components/ui/Card';

export default function WorkflowsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold text-brand-black">Workflows</h1>

      <Card>
        <CardTitle>Workflow Management</CardTitle>
        <p className="text-brand-silver-500">
          Workflow views and transitions will be configured here. Workflow status changes are
          handled through Cloud Functions to ensure validation, audit logging, and side-effect
          processing.
        </p>
      </Card>
    </div>
  );
}
