import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, collection, onSnapshot, query, orderBy,
  updateDoc, addDoc, serverTimestamp, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '@/lib/firebase';
import { ArrowLeft, Send, Loader2, Upload, FileText, Download, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface Milestone { label: string; complete: boolean; }
interface Project {
  id: string; name: string; status: string;
  milestones?: Milestone[]; nextSteps?: string[];
}
interface ClientDoc {
  id: string; name: string; url: string;
  uploadedBy: string; uploadedAt: { toDate: () => Date } | null;
  requiresSignature?: boolean;
}
interface Message {
  id: string; sender: 'jason' | 'client';
  text: string; timestamp: { toDate: () => Date } | null; read: boolean;
}
interface ClientProfile { name: string; email: string; service: string; status: string; }

type Tab = 'projects' | 'documents' | 'messages';

const PROJECT_STATUSES = ['pending', 'in_progress', 'complete', 'on_hold'];

export default function ClientDetailPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('projects');
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<ClientDoc[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgText, setMsgText] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newStep, setNewStep] = useState<Record<string, string>>({});
  const [addingMilestone, setAddingMilestone] = useState<Record<string, string>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const cid = clientId ?? '';

  useEffect(() => {
    if (!cid) return;
    const p1 = onSnapshot(doc(firestore, 'clients', cid), (s) => s.exists() && setProfile(s.data() as ClientProfile));
    const p2 = onSnapshot(query(collection(firestore, 'clients', cid, 'projects')), (s) =>
      setProjects(s.docs.map((d) => ({ id: d.id, ...d.data() } as Project)))
    );
    const p3 = onSnapshot(query(collection(firestore, 'clients', cid, 'documents'), orderBy('uploadedAt', 'desc')), (s) =>
      setDocuments(s.docs.map((d) => ({ id: d.id, ...d.data() } as ClientDoc)))
    );
    const p4 = onSnapshot(query(collection(firestore, 'clients', cid, 'messages'), orderBy('timestamp', 'asc')), (s) => {
      void (async () => {
        setMessages(s.docs.map((d) => ({ id: d.id, ...d.data() } as Message)));
        // Mark client messages as read
        for (const d of s.docs.filter((d) => !d.data().read && d.data().sender === 'client')) {
          await updateDoc(doc(firestore, 'clients', cid, 'messages', d.id), { read: true });
        }
      })();
    });
    return () => { p1(); p2(); p3(); p4(); };
  }, [cid]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // --- Milestones ---
  const toggleMilestone = async (project: Project, index: number) => {
    const updated = (project.milestones ?? []).map((m, i) =>
      i === index ? { ...m, complete: !m.complete } : m
    );
    await updateDoc(doc(firestore, 'clients', cid, 'projects', project.id), { milestones: updated });
  };

  const addMilestone = async (project: Project) => {
    const label = addingMilestone[project.id]?.trim();
    if (!label) return;
    const updated = [...(project.milestones ?? []), { label, complete: false }];
    await updateDoc(doc(firestore, 'clients', cid, 'projects', project.id), { milestones: updated });
    setAddingMilestone((p) => ({ ...p, [project.id]: '' }));
  };

  const addNextStep = async (project: Project) => {
    const step = newStep[project.id]?.trim();
    if (!step) return;
    await updateDoc(doc(firestore, 'clients', cid, 'projects', project.id), {
      nextSteps: arrayUnion(step),
    });
    setNewStep((p) => ({ ...p, [project.id]: '' }));
  };

  const removeNextStep = async (project: Project, step: string) => {
    await updateDoc(doc(firestore, 'clients', cid, 'projects', project.id), {
      nextSteps: arrayRemove(step),
    });
  };

  const setProjectStatus = async (project: Project, status: string) => {
    await updateDoc(doc(firestore, 'clients', cid, 'projects', project.id), { status });
  };

  // --- Documents ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    const storageRef = ref(storage, `clients/${cid}/documents/${Date.now()}_${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      'state_changed',
      (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      () => setUploading(false),
      () => {
        void (async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          await addDoc(collection(firestore, 'clients', cid, 'documents'), {
            name: file.name, url, uploadedBy: 'jason',
            uploadedAt: serverTimestamp(), size: file.size, requiresSignature: false,
          });
          setUploading(false);
          setUploadProgress(0);
        })();
      }
    );
    e.target.value = '';
  };

  // --- Messages ---
  const sendMessage = async () => {
    const trimmed = msgText.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await addDoc(collection(firestore, 'clients', cid, 'messages'), {
        sender: 'jason', text: trimmed, timestamp: serverTimestamp(), read: false,
      });
      setMsgText('');
    } finally { setSending(false); }
  };

  if (!cid) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => void navigate(-1)} className="rounded-xl p-2 text-brand-silver-400 hover:bg-brand-silver-100 hover:text-brand-black transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-black">{profile?.name ?? '…'}</h1>
          <p className="text-sm text-brand-silver-500">{profile?.email} · {profile?.service}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-silver-200">
        <nav className="-mb-px flex gap-6">
          {(['projects', 'documents', 'messages'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`border-b-2 pb-3 text-sm font-semibold capitalize transition-colors ${t === tab ? 'border-brand-blue-500 text-brand-blue-500' : 'border-transparent text-brand-silver-500 hover:text-brand-black'}`}>
              {t}
            </button>
          ))}
        </nav>
      </div>

      {/* ---- PROJECTS ---- */}
      {tab === 'projects' && (
        <div className="space-y-6">
          {projects.length === 0 && <p className="text-sm text-brand-silver-400">No projects yet.</p>}
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-brand-silver-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-lg font-bold text-brand-black">{project.name}</h2>
                <select
                  value={project.status}
                  onChange={(e) => { void setProjectStatus(project, e.target.value); }}
                  className="rounded-xl border border-brand-silver-200 px-3 py-1.5 text-sm focus:border-brand-blue-400 focus:outline-none"
                >
                  {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>

              {/* Milestones */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-silver-400">Milestones</p>
                <ol className="space-y-2">
                  {(project.milestones ?? []).map((m, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <button onClick={() => { void toggleMilestone(project, i); }} className="shrink-0">
                        {m.complete
                          ? <CheckCircle className="h-5 w-5 text-green-500" />
                          : <Circle className="h-5 w-5 text-brand-silver-300 hover:text-brand-silver-500" />}
                      </button>
                      <span className={`text-sm ${m.complete ? 'text-brand-silver-400 line-through' : 'text-brand-black'}`}>{m.label}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 flex gap-2">
                  <input
                    value={addingMilestone[project.id] ?? ''}
                    onChange={(e) => setAddingMilestone((p) => ({ ...p, [project.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') void addMilestone(project); }}
                    placeholder="Add milestone…"
                    className="flex-1 rounded-xl border border-brand-silver-200 px-3 py-1.5 text-sm focus:border-brand-blue-400 focus:outline-none"
                  />
                  <button onClick={() => { void addMilestone(project); }} className="rounded-xl bg-brand-blue-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Next steps */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-silver-400">Client Next Steps</p>
                <ul className="space-y-2">
                  {(project.nextSteps ?? []).map((step, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="flex-1 text-sm text-brand-black">{step}</span>
                      <button onClick={() => { void removeNextStep(project, step); }} className="shrink-0 text-brand-silver-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <input
                    value={newStep[project.id] ?? ''}
                    onChange={(e) => setNewStep((p) => ({ ...p, [project.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') void addNextStep(project); }}
                    placeholder="Add action item for client…"
                    className="flex-1 rounded-xl border border-brand-silver-200 px-3 py-1.5 text-sm focus:border-brand-blue-400 focus:outline-none"
                  />
                  <button onClick={() => { void addNextStep(project); }} className="rounded-xl bg-brand-blue-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- DOCUMENTS ---- */}
      {tab === 'documents' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-brand-silver-300 bg-white p-6 text-center">
            <Upload className="mx-auto mb-2 h-8 w-8 text-brand-silver-400" />
            <label className="mt-3 inline-block cursor-pointer rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors">
              {uploading ? `Uploading ${uploadProgress}%` : 'Upload Document'}
              <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </label>
            {uploading && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-silver-100">
                <div className="h-full rounded-full bg-brand-blue-500 transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}
          </div>
          {documents.length === 0
            ? <p className="text-center text-sm text-brand-silver-400">No documents yet.</p>
            : (
              <ul className="space-y-3">
                {documents.map((d) => (
                  <li key={d.id} className="flex items-center gap-4 rounded-2xl border border-brand-silver-200 bg-white p-4 shadow-sm">
                    <FileText className="h-8 w-8 shrink-0 text-brand-blue-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-brand-black">{d.name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${d.uploadedBy === 'jason' ? 'bg-brand-blue-100 text-brand-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                          {d.uploadedBy === 'jason' ? 'You' : 'Client'}
                        </span>
                        {d.uploadedAt && <span className="text-xs text-brand-silver-400">{formatDistanceToNow(d.uploadedAt.toDate(), { addSuffix: true })}</span>}
                      </div>
                    </div>
                    <a href={d.url} target="_blank" rel="noreferrer noopener" className="shrink-0 rounded-lg p-2 text-brand-silver-400 hover:bg-brand-silver-100 hover:text-brand-black transition-colors">
                      <Download className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}

      {/* ---- MESSAGES ---- */}
      {tab === 'messages' && (
        <div className="flex flex-col rounded-2xl border border-brand-silver-200 bg-white shadow-sm overflow-hidden" style={{ height: '520px' }}>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-brand-silver-400">No messages yet.</p>
              </div>
            )}
            {messages.map((msg) => {
              const isJason = msg.sender === 'jason';
              const time = msg.timestamp ? format(msg.timestamp.toDate(), 'MMM d, h:mm a') : '';
              return (
                <div key={msg.id} className={`flex flex-col gap-1 ${isJason ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${isJason ? 'rounded-br-sm bg-brand-blue-500 text-white' : 'rounded-bl-sm bg-brand-silver-100 text-brand-black'}`}>
                    {msg.text}
                  </div>
                  {time && <span className="text-xs text-brand-silver-400">{time}</span>}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-brand-silver-200 p-3">
            <div className="flex items-end gap-3">
              <textarea
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void sendMessage(); } }}
                rows={2}
                placeholder="Message as Jason… (Enter to send)"
                className="flex-1 resize-none rounded-xl border border-brand-silver-200 px-3 py-2 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
              />
              <button onClick={() => void sendMessage()} disabled={!msgText.trim() || sending}
                className="shrink-0 rounded-xl bg-brand-blue-500 p-2.5 text-white hover:bg-brand-blue-600 disabled:opacity-40 transition-colors">
                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
