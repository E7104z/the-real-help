import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { firestore, functions } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { Plus, Loader2, ChevronRight, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: { toDate: () => Date } | null;
}

interface PendingClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: { toDate: () => Date } | null;
}

const SERVICE_OPTIONS = [
  'Business Formation',
  'Business Plan',
  'Financial Coaching',
  'Marketing Strategy',
  'Tax Preparation',
  'Grant Writing',
  'Other',
];

export default function ClientManager() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; service: string }>({ name: '', email: '', service: SERVICE_OPTIONS[0] as string });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const [pendingClients, setPendingClients] = useState<PendingClient[]>([]);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [sendingInvite, setSendingInvite] = useState<Record<string, boolean>>({});
  const [inviteError, setInviteError] = useState<Record<string, string>>({});

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(firestore, 'clients'), orderBy('createdAt', 'desc')),
      (snap) => {
        setClients(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Client)));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(firestore, 'pendingClients'), orderBy('createdAt', 'desc')),
      (snap) => {
        setPendingClients(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PendingClient)));
        setPendingLoading(false);
      },
      () => setPendingLoading(false)
    );
    return unsub;
  }, []);

  const handleSendInvite = async (lead: PendingClient) => {
    setSendingInvite((s) => ({ ...s, [lead.id]: true }));
    setInviteError((e) => ({ ...e, [lead.id]: '' }));
    try {
      const createClientFn = httpsCallable<
        { name: string; email: string; service: string; pendingClientId: string },
        { clientId: string }
      >(functions, 'createClient');
      await createClientFn({
        name: lead.name,
        email: lead.email,
        service: lead.service || 'General',
        pendingClientId: lead.id,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send invite.';
      setInviteError((e) => ({ ...e, [lead.id]: msg }));
    } finally {
      setSendingInvite((s) => ({ ...s, [lead.id]: false }));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setCreating(true);
    setCreateError('');
    try {
      const createClient = httpsCallable<
        { name: string; email: string; service: string },
        { clientId: string }
      >(functions, 'createClient');
      await createClient(form);
      setShowForm(false);
      setForm({ name: '', email: '', service: SERVICE_OPTIONS[0] as string });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create client.';
      setCreateError(msg);
    } finally {
      setCreating(false);
    }
  };

  const STATUS_COLOR: Record<string, string> = {
    active:   'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-500',
    pending:  'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-brand-black">Clients</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-xl bg-brand-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* New client form */}
      {showForm && (
        <form onSubmit={handleCreate} className="rounded-2xl border border-brand-silver-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-brand-black">New Client</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-silver-600">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-brand-silver-200 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-silver-600">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-brand-silver-200 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                placeholder="jane@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-brand-silver-600">Service</label>
              <select
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                className="w-full rounded-xl border border-brand-silver-200 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
              >
                {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {createError && <p className="text-sm text-red-600">{createError}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-silver-500 hover:text-brand-black transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="flex items-center gap-2 rounded-xl bg-brand-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-600 disabled:opacity-50 transition-colors"
            >
              {creating && <Loader2 className="h-4 w-4 animate-spin" />}
              {creating ? 'Creating…' : 'Create & Send Invite'}
            </button>
          </div>
        </form>
      )}

      {/* New Leads from contact form */}
      {(pendingLoading || pendingClients.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-brand-black">New Leads</h2>
            {pendingClients.length > 0 && (
              <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-700">
                {pendingClients.length}
              </span>
            )}
          </div>
          {pendingLoading ? (
            <div className="flex h-20 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-brand-silver-400" />
            </div>
          ) : (
            <ul className="space-y-2">
              {pendingClients.map((lead) => (
                <li key={lead.id} className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-bold text-sm">
                      {lead.name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="font-semibold text-brand-black">{lead.name}</p>
                      <p className="text-sm text-brand-silver-500">{lead.email}{lead.service ? ` · ${lead.service}` : ''}</p>
                      {lead.message && (
                        <p className="text-xs text-brand-silver-400 line-clamp-2">{lead.message}</p>
                      )}
                      {inviteError[lead.id] && (
                        <p className="text-xs text-red-600">{inviteError[lead.id]}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      {lead.createdAt && (
                        <span className="text-xs text-brand-silver-400">
                          {formatDistanceToNow(lead.createdAt.toDate(), { addSuffix: true })}
                        </span>
                      )}
                      <button
                        onClick={() => handleSendInvite(lead)}
                        disabled={sendingInvite[lead.id]}
                        className="flex items-center gap-1.5 rounded-xl bg-brand-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-600 disabled:opacity-50 transition-colors"
                      >
                        {sendingInvite[lead.id] && <Loader2 className="h-3 w-3 animate-spin" />}
                        {sendingInvite[lead.id] ? 'Sending…' : 'Send Invite'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Client list */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-brand-blue-500" />
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-brand-silver-200 bg-white p-10 text-center">
          <User className="mx-auto mb-3 h-10 w-10 text-brand-silver-300" />
          <p className="text-brand-silver-400">No clients yet. Add your first client above.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {clients.map((client) => (
            <li key={client.id}>
              <button
                onClick={() => navigate(`${ROUTES.ADMIN_CLIENTS}/${client.id}`)}
                className="w-full flex items-center gap-4 rounded-2xl border border-brand-silver-200 bg-white p-4 shadow-sm text-left hover:border-brand-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600 font-bold text-sm">
                  {client.name?.charAt(0)?.toUpperCase() ?? '?'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-black">{client.name}</p>
                  <p className="text-sm text-brand-silver-500">{client.email} · {client.service}</p>
                </div>
                <div className="flex items-center gap-3">
                  {client.createdAt && (
                    <span className="hidden text-xs text-brand-silver-400 sm:block">
                      {formatDistanceToNow(client.createdAt.toDate(), { addSuffix: true })}
                    </span>
                  )}
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[client.status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {client.status ?? 'active'}
                  </span>
                  <ChevronRight className="h-4 w-4 text-brand-silver-400" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
