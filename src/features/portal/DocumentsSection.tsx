import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '@/lib/firebase';
import { Download, Upload, FileText, Loader2, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Document {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: { toDate: () => Date } | null;
  requiresSignature?: boolean;
  size?: number;
}

interface DocumentsSectionProps {
  clientId: string;
}

export default function DocumentsSection({ clientId }: DocumentsSectionProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(firestore, 'clients', clientId, 'documents'), orderBy('uploadedAt', 'desc')),
      (snap) => {
        setDocuments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Document)));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [clientId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `clients/${clientId}/documents/${Date.now()}_${file.name}`);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        'state_changed',
        (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        () => { setError('Upload failed. Please try again.'); setUploading(false); },
        () => {
          void (async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            await addDoc(collection(firestore, 'clients', clientId, 'documents'), {
              name: file.name,
              url,
              uploadedBy: 'client',
              uploadedAt: serverTimestamp(),
              size: file.size,
              requiresSignature: false,
            });
            setUploading(false);
            setUploadProgress(0);
          })();
        }
      );
    } catch {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }

    // Reset input
    e.target.value = '';
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Upload */}
      <div className="rounded-2xl border border-dashed border-brand-silver-300 bg-white p-6 text-center">
        <Upload className="mx-auto mb-2 h-8 w-8 text-brand-silver-400" />
        <p className="text-sm text-brand-silver-500">Upload a document for review</p>
        <label className="mt-3 inline-block cursor-pointer rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-600 transition-colors">
          {uploading ? `Uploading ${uploadProgress}%` : 'Choose File'}
          <input type="file" className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} disabled={uploading} />
        </label>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {uploading && (
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-silver-100">
            <div
              className="h-full rounded-full bg-brand-blue-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Document list */}
      {documents.length === 0 ? (
        <div className="rounded-2xl border border-brand-silver-200 bg-white p-10 text-center">
          <p className="text-brand-silver-400">No documents yet. Jason will upload files here as your project progresses.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center gap-4 rounded-2xl border border-brand-silver-200 bg-white p-4 shadow-sm">
              <FileText className="h-8 w-8 shrink-0 text-brand-blue-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-black">{doc.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${doc.uploadedBy === 'jason' ? 'bg-brand-blue-100 text-brand-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {doc.uploadedBy === 'jason' ? 'From Jason' : 'You'}
                  </span>
                  {doc.uploadedAt && (
                    <span className="text-xs text-brand-silver-400">
                      {formatDistanceToNow(doc.uploadedAt.toDate(), { addSuffix: true })}
                    </span>
                  )}
                  {doc.requiresSignature && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      <Lock className="h-3 w-3" /> Signature required
                    </span>
                  )}
                </div>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 rounded-lg p-2 text-brand-silver-400 hover:bg-brand-silver-100 hover:text-brand-black transition-colors"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
