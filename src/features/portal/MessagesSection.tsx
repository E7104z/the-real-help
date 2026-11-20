import { useState, useEffect, useRef } from 'react';
import {
  collection, addDoc, onSnapshot, query, orderBy,
  serverTimestamp, updateDoc, doc,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Send, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: 'jason' | 'client';
  text: string;
  timestamp: { toDate: () => Date } | null;
  read: boolean;
}

interface MessagesSectionProps {
  clientId: string;
}

export default function MessagesSection({ clientId }: MessagesSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(firestore, 'clients', clientId, 'messages'), orderBy('timestamp', 'asc')),
      (snap) => {
        void (async () => {
          setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)));
          setLoading(false);

          // Mark unread jason messages as read
          const unread = snap.docs.filter((d) => !d.data().read && d.data().sender === 'jason');
          for (const msg of unread) {
            await updateDoc(doc(firestore, 'clients', clientId, 'messages', msg.id), { read: true });
          }
        })();
      }
    );
    return unsub;
  }, [clientId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await addDoc(collection(firestore, 'clients', clientId, 'messages'), {
        sender: 'client',
        text: trimmed,
        timestamp: serverTimestamp(),
        read: false,
      });
      setText('');
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(); }
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-brand-silver-200 bg-white shadow-sm overflow-hidden" style={{ height: '520px' }}>
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-brand-silver-400">
              No messages yet. Send Jason a message to get started.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-brand-silver-200 p-3">
        <div className="flex items-end gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
            placeholder="Type a message… (Enter to send)"
            className="flex-1 resize-none rounded-xl border border-brand-silver-200 px-3 py-2 text-sm text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
          />
          <button
            onClick={() => void send()}
            disabled={!text.trim() || sending}
            className="shrink-0 rounded-xl bg-brand-blue-500 p-2.5 text-white hover:bg-brand-blue-600 disabled:opacity-40 transition-colors"
          >
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isClient = msg.sender === 'client';
  const time = msg.timestamp ? format(msg.timestamp.toDate(), 'MMM d, h:mm a') : '';

  return (
    <div className={`flex flex-col gap-1 ${isClient ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
          isClient
            ? 'rounded-br-sm bg-brand-blue-500 text-white'
            : 'rounded-bl-sm bg-brand-silver-100 text-brand-black'
        }`}
      >
        {msg.text}
      </div>
      {time && <span className="text-xs text-brand-silver-400">{time}</span>}
    </div>
  );
}
