import { useState, useRef, type ChangeEvent } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, firestore } from '@/lib/firebase';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/feedback/Toast';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  tenantId: string;
  linkedRecordId?: string;
  onUploadComplete?: () => void;
}

export function FileUpload({ tenantId, linkedRecordId, onUploadComplete }: FileUploadProps) {
  const { currentUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !currentUser) return;

    setUploading(true);
    setProgress(0);

    const storagePath = `tenants/${tenantId}/files/${Date.now()}_${selectedFile.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        toast.error(`Upload failed: ${error.message}`);
        setUploading(false);
      },
      () => {
        void (async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(firestore, 'tenants', tenantId, 'files'), {
            tenantId,
            ownerId: currentUser.uid,
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            path: storagePath,
            downloadUrl,
            sizeBytes: selectedFile.size,
            createdAt: serverTimestamp(),
            createdBy: currentUser.uid,
            status: 'active',
            linkedRecordIds: linkedRecordId ? [linkedRecordId] : [],
          });

          toast.success('File uploaded successfully.');
          setSelectedFile(null);
          setUploading(false);
          setProgress(0);
          onUploadComplete?.();
        })();
      },
    );
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        onChange={handleSelect}
        className="hidden"
        accept="*/*"
      />

      {selectedFile ? (
        <div className="flex items-center gap-3 rounded-lg border border-brand-silver-300 bg-brand-silver-50 p-3">
          <Upload className="h-5 w-5 text-brand-silver-500" />
          <span className="flex-1 truncate text-sm">{selectedFile.name}</span>
          <button onClick={() => { setSelectedFile(null); }} className="text-brand-silver-400 hover:text-brand-black">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Button
          variant="secondary"
          onClick={() => { inputRef.current?.click(); }}
        >
          <Upload className="h-4 w-4" />
          Select File
        </Button>
      )}

      {selectedFile && (
        <div className="space-y-2">
          {uploading && (
            <div className="h-2 overflow-hidden rounded-full bg-brand-silver-200">
              <div
                className="h-full rounded-full bg-accent-blue transition-all"
                style={{ width: `${String(progress)}%` }}
              />
            </div>
          )}
          <Button
            onClick={handleUpload}
            loading={uploading}
            disabled={uploading}
          >
            {uploading ? `Uploading ${String(progress)}%` : 'Upload'}
          </Button>
        </div>
      )}
    </div>
  );
}
