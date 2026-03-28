import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/app/providers/AuthProvider';
import { CheckCircle, Circle, FileText, MessageSquare, Loader2, ChevronRight } from 'lucide-react';
import DocumentsSection from './DocumentsSection';
import MessagesSection from './MessagesSection';

interface Milestone {
  label: string;
  complete: boolean;
}

interface Project {
  id: string;
  name: string;
  status: string;
  milestones: Milestone[];
  nextSteps: string[];
  startDate?: { toDate: () => Date };
  estimatedCompletion?: { toDate: () => Date };
}

interface ClientProfile {
  name: string;
  service: string;
  status: string;
}

type Tab = 'overview' | 'documents' | 'messages';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  pending:     { label: 'Pending Start', color: 'bg-yellow-100 text-yellow-700' },
  complete:    { label: 'Complete', color: 'bg-green-100 text-green-700' },
  on_hold:     { label: 'On Hold', color: 'bg-gray-100 text-gray-600' },
};

export default function PortalDashboard() {
  const { currentUser } = useAuth();
  const clientId = currentUser!.uid;

  const [tab, setTab] = useState<Tab>('overview');
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const profileUnsub = onSnapshot(doc(firestore, 'clients', clientId), (snap) => {
      if (snap.exists()) setProfile(snap.data() as ClientProfile);
    });

    const projectsUnsub = onSnapshot(
      collection(firestore, 'clients', clientId, 'projects'),
      (snap) => {
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
        setLoading(false);
      }
    );

    // Watch unread messages count
    const messagesUnsub = onSnapshot(
      query(collection(firestore, 'clients', clientId, 'messages'), orderBy('timestamp', 'desc')),
      (snap) => {
        setUnreadCount(snap.docs.filter((d) => !d.data().read && d.data().sender === 'jason').length);
      }
    );

    return () => { profileUnsub(); projectsUnsub(); messagesUnsub(); };
  }, [clientId]);

  const firstName = profile?.name?.split(' ')[0] ?? currentUser?.email?.split('@')[0] ?? 'there';

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <ChevronRight className="h-4 w-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
    ...(unreadCount > 0
      ? [{ id: 'messages' as Tab, label: 'Messages', icon: <MessageSquare className="h-4 w-4" />, badge: unreadCount }]
      : [{ id: 'messages' as Tab, label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> }]),
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-brand-black">
          Welcome back, {firstName}.
        </h1>
        {profile && (
          <p className="mt-1 text-sm text-brand-silver-500">
            {profile.service} · Here&apos;s your project status.
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-silver-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'border-brand-blue-500 text-brand-blue-500'
                  : 'border-transparent text-brand-silver-500 hover:text-brand-black'
              }`}
            >
              {t.label}
              {t.badge !== undefined && (
                <span className="rounded-full bg-brand-blue-500 px-2 py-0.5 text-xs font-bold text-white">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-brand-silver-200 bg-white p-10 text-center">
              <p className="text-brand-silver-400">Your project details will appear here once Jason sets everything up.</p>
            </div>
          ) : (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      )}

      {tab === 'documents' && <DocumentsSection clientId={clientId} />}
      {tab === 'messages' && <MessagesSection clientId={clientId} />}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_LABELS[project.status] ?? { label: project.status, color: 'bg-gray-100 text-gray-600' };
  const completed = project.milestones?.filter((m) => m.complete).length ?? 0;
  const total = project.milestones?.length ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-brand-silver-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-brand-black">{project.name}</h2>
          {total > 0 && (
            <p className="mt-1 text-sm text-brand-silver-500">{completed} of {total} milestones complete</p>
          )}
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-silver-100">
            <div
              className="h-full rounded-full bg-brand-blue-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-brand-silver-400">{pct}%</p>
        </div>
      )}

      {/* Milestone timeline */}
      {project.milestones?.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-silver-400">
            Milestones
          </p>
          <ol className="space-y-3">
            {project.milestones.map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {m.complete ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-brand-silver-300" />
                  )}
                </div>
                <span className={`text-sm ${m.complete ? 'text-brand-silver-400 line-through' : 'text-brand-black'}`}>
                  {m.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Next steps */}
      {project.nextSteps?.length > 0 && (
        <div className="mt-6 rounded-xl bg-brand-blue-50 border border-brand-blue-100 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-blue-600">
            Action Required
          </p>
          <ul className="space-y-2">
            {project.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-blue-700">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue-400" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
