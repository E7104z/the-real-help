import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface Party {
  name: string;
  entity: string;
}

interface Property {
  address: string;
  parcelNumber: string;
  jurisdiction: string;
  grantor: Party;
  grantee: Party;
  legalDescription: string;
  consideration: string;
  debtSatisfied: boolean;
  filingNeeded: boolean;
}

interface DocumentURL {
  propertyAddress: string;
  deedUrl: string;
}

interface PropertyTransfer {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  properties: Property[];
  status: 'pending' | 'processing' | 'completed' | 'error';
  documentsGenerated: boolean;
  documentURLs?: DocumentURL[];
  error?: string;
  submittedAt: { toDate: () => Date } | null;
  processedAt?: { toDate: () => Date } | null;
}

const STATUS_STYLES: Record<PropertyTransfer['status'], string> = {
  pending:    'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed:  'bg-green-100 text-green-800',
  error:      'bg-red-100 text-red-800',
};

function formatDate(ts: { toDate: () => Date } | null | undefined) {
  if (!ts?.toDate) return 'N/A';
  return ts.toDate().toLocaleString();
}

function calculatePricing(transfer: PropertyTransfer) {
  const count = transfer.properties.length;
  const basePrice = count <= 2 ? 349 : count <= 5 ? 299 : 249;
  const subtotal = basePrice * count;
  const filingFees = transfer.properties.filter((p) => p.filingNeeded).length * 75;
  const recordingFees = transfer.properties.reduce(
    (acc, p) => acc + (p.jurisdiction === 'St. Louis City' ? 23 : 24),
    0
  );
  return { basePrice, subtotal, filingFees, recordingFees, total: subtotal + filingFees + recordingFees };
}

export default function PropertyTransfersTab() {
  const [transfers, setTransfers] = useState<PropertyTransfer[]>([]);
  const [selected, setSelected] = useState<PropertyTransfer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, 'propertyTransfers'), orderBy('submittedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setTransfers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PropertyTransfer)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateStatus = async (transferId: string, newStatus: PropertyTransfer['status']) => {
    try {
      await updateDoc(doc(firestore, 'propertyTransfers', transferId), { status: newStatus });
      if (selected?.id === transferId) setSelected((s) => s ? { ...s, status: newStatus } : s);
    } catch {
      alert('Failed to update status.');
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-brand-silver-400">Loading property transfers…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-brand-black">Property Transfers</h2>
        <span className="text-sm text-brand-silver-400">
          {transfers.length} submission{transfers.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-brand-silver-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-brand-silver-200">
          <thead className="bg-brand-silver-50">
            <tr>
              {['Client', 'Contact', 'Properties', 'Status', 'Submitted', ''].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-silver-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-silver-100">
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-brand-silver-400">
                  No property transfer requests yet.
                </td>
              </tr>
            ) : (
              transfers.map((t) => (
                <tr key={t.id} className="hover:bg-brand-silver-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-brand-black">{t.clientName}</td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-brand-black">{t.clientEmail}</div>
                    <div className="text-xs text-brand-silver-400">{t.clientPhone}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-black">
                    {t.properties.length} propert{t.properties.length !== 1 ? 'ies' : 'y'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_STYLES[t.status]}`}>
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-silver-400">{formatDate(t.submittedAt)}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(t)}
                      className="text-sm font-semibold text-brand-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-silver-200 px-6 py-4">
              <h3 className="font-heading text-lg font-bold text-brand-black">Transfer Details</h3>
              <button onClick={() => setSelected(null)} className="text-2xl leading-none text-brand-silver-400 hover:text-brand-black">×</button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Client */}
              <section>
                <h4 className="mb-3 font-bold text-brand-black">Client Information</h4>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-brand-silver-50 p-4 text-sm">
                  <div><p className="text-brand-silver-400">Name</p><p className="font-semibold">{selected.clientName}</p></div>
                  <div><p className="text-brand-silver-400">Email</p><p className="font-semibold">{selected.clientEmail}</p></div>
                  <div><p className="text-brand-silver-400">Phone</p><p className="font-semibold">{selected.clientPhone}</p></div>
                  <div><p className="text-brand-silver-400">Submitted</p><p className="font-semibold">{formatDate(selected.submittedAt)}</p></div>
                </div>
              </section>

              {/* Properties */}
              <section>
                <h4 className="mb-3 font-bold text-brand-black">Properties ({selected.properties.length})</h4>
                <div className="space-y-4">
                  {selected.properties.map((prop, i) => (
                    <div key={i} className="rounded-xl border border-brand-silver-200 bg-brand-silver-50 p-4 text-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-bold text-brand-black">Property {i + 1}</span>
                        <span className="rounded-full bg-brand-silver-200 px-2 py-0.5 text-xs">{prop.jurisdiction}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><p className="text-brand-silver-400">Address</p><p className="font-medium">{prop.address}</p></div>
                        <div><p className="text-brand-silver-400">Parcel #</p><p className="font-medium">{prop.parcelNumber}</p></div>
                        <div><p className="text-brand-silver-400">Grantor</p><p className="font-medium">{prop.grantor.name} ({prop.grantor.entity})</p></div>
                        <div><p className="text-brand-silver-400">Grantee</p><p className="font-medium">{prop.grantee.name} ({prop.grantee.entity})</p></div>
                        <div className="col-span-2"><p className="text-brand-silver-400">Legal Description</p><p className="font-medium">{prop.legalDescription}</p></div>
                        <div><p className="text-brand-silver-400">Consideration</p><p className="font-medium">${prop.consideration}</p></div>
                        <div><p className="text-brand-silver-400">Filing Needed</p><p className="font-medium">{prop.filingNeeded ? 'Yes (+$75)' : 'No'}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing */}
              <section>
                <h4 className="mb-3 font-bold text-brand-black">Pricing Breakdown</h4>
                {(() => {
                  const p = calculatePricing(selected);
                  return (
                    <div className="rounded-xl bg-brand-silver-50 p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>{selected.properties.length} propert{selected.properties.length !== 1 ? 'ies' : 'y'} × ${p.basePrice}</span>
                        <span className="font-medium">${p.subtotal}</span>
                      </div>
                      {p.filingFees > 0 && (
                        <div className="flex justify-between">
                          <span>Filing coordination</span>
                          <span className="font-medium">${p.filingFees}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Recording fees (est.)</span>
                        <span className="font-medium">${p.recordingFees}</span>
                      </div>
                      <div className="flex justify-between border-t border-brand-silver-200 pt-2 text-base font-bold">
                        <span>Total</span>
                        <span>${p.total}</span>
                      </div>
                    </div>
                  );
                })()}
              </section>

              {/* Generated Documents */}
              {selected.documentsGenerated && (selected.documentURLs ?? []).length > 0 && (
                <section>
                  <h4 className="mb-3 font-bold text-brand-black">Generated Documents</h4>
                  <div className="space-y-2">
                    {(selected.documentURLs ?? []).map((d, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-green-50 p-3 text-sm">
                        <span>{d.propertyAddress}</span>
                        <a
                          href={d.deedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand-blue-500 hover:underline"
                        >
                          View Deed →
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Error */}
              {selected.status === 'error' && selected.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <p className="mb-1 font-bold text-red-800">Error</p>
                  {selected.error}
                </div>
              )}

              {/* Status */}
              <section>
                <h4 className="mb-3 font-bold text-brand-black">Update Status</h4>
                <div className="flex gap-2 flex-wrap">
                  {(['pending', 'processing', 'completed'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => void updateStatus(selected.id, s)}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                        selected.status === s
                          ? STATUS_STYLES[s].replace('100', '600').replace(/text-\w+-800/, 'text-white')
                          : `${STATUS_STYLES[s]} hover:opacity-80`
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="border-t border-brand-silver-200 bg-brand-silver-50 px-6 py-4">
              <button
                onClick={() => setSelected(null)}
                className="rounded-xl bg-brand-silver-200 px-4 py-2 text-sm font-semibold text-brand-black hover:bg-brand-silver-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
