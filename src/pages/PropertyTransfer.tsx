import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { CONTACT_EMAIL } from '@/lib/constants/site';

interface Party {
  name: string;
  entity: 'Individual' | 'LLC' | 'Trust' | 'Corporation';
}

interface Property {
  address: string;
  parcelNumber: string;
  jurisdiction: 'St. Louis City' | 'St. Louis County';
  grantor: Party;
  grantee: Party;
  legalDescription: string;
  consideration: string;
  debtSatisfied: boolean;
  filingNeeded: boolean;
}

const defaultProperty = (): Property => ({
  address: '',
  parcelNumber: '',
  jurisdiction: 'St. Louis County',
  grantor: { name: '', entity: 'Individual' },
  grantee: { name: '', entity: 'Individual' },
  legalDescription: '',
  consideration: '0',
  debtSatisfied: true,
  filingNeeded: false,
});

const ENTITY_OPTIONS = ['Individual', 'LLC', 'Trust', 'Corporation'] as const;

export default function PropertyTransfer() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [properties, setProperties] = useState<Property[]>([defaultProperty()]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Property helpers ────────────────────────────────────────────────────

  const addProperty = () => setProperties((prev) => [...prev, defaultProperty()]);

  const removeProperty = (index: number) =>
    setProperties((prev) => prev.filter((_, i) => i !== index));

  const updateProperty = (index: number, field: string, value: unknown) => {
    setProperties((prev) => {
      const updated = prev.map((p, i) => {
        if (i !== index) return p;
        if (field === 'grantor.name') return { ...p, grantor: { ...p.grantor, name: value as string } };
        if (field === 'grantor.entity') return { ...p, grantor: { ...p.grantor, entity: value as Party['entity'] } };
        if (field === 'grantee.name') return { ...p, grantee: { ...p.grantee, name: value as string } };
        if (field === 'grantee.entity') return { ...p, grantee: { ...p.grantee, entity: value as Party['entity'] } };
        return { ...p, [field]: value };
      });
      return updated;
    });
  };

  // ── Submit ──────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(firestore, 'propertyTransfers'), {
        clientName,
        clientEmail,
        clientPhone,
        properties,
        submittedAt: serverTimestamp(),
        status: 'pending',
        documentsGenerated: false,
        documentURLs: [],
      });
      setSubmitted(true);
    } catch {
      alert(`Submission failed. Please try again or email ${CONTACT_EMAIL}.`);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ───────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-2xl">
          <div className="mb-4 text-6xl">✅</div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Submission Received</h2>
          <p className="mb-8 text-slate-600">
            I'll review your property transfer request and send you a quote within 4 hours.
          </p>
          <Link
            to="/"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Page header */}
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-block">
            <img
              src="/images/Logo/Real%20Logo1.png"
              alt="The Real Help, LLC"
              className="mx-auto h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Property Transfer Request</h1>
          <p className="mt-2 text-slate-400">
            Quit claim deed + tax documentation service. Fixed pricing, 2-day turnaround.
          </p>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-8">

          {/* ── Client Information ────────────────────────────────────── */}
          <section className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">Your Information</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(314) 555-0100"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </section>

          {/* ── Properties ───────────────────────────────────────────── */}
          {properties.map((prop, idx) => (
            <section key={idx} className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Property {idx + 1}
                </h2>
                {properties.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProperty(idx)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Address + Parcel + Jurisdiction */}
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={prop.address}
                    onChange={(e) => updateProperty(idx, 'address', e.target.value)}
                    placeholder="123 Main St, St. Louis, MO 63101"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Parcel Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={prop.parcelNumber}
                    onChange={(e) => updateProperty(idx, 'parcelNumber', e.target.value)}
                    placeholder="12A-34-5678"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Jurisdiction <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={prop.jurisdiction}
                    onChange={(e) => updateProperty(idx, 'jurisdiction', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="St. Louis County">St. Louis County</option>
                    <option value="St. Louis City">St. Louis City</option>
                  </select>
                </div>
              </div>

              {/* Legal Description */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Legal Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={prop.legalDescription}
                  onChange={(e) => updateProperty(idx, 'legalDescription', e.target.value)}
                  placeholder="As shown on the deed or tax records…"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Consideration + Checkboxes */}
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Consideration / Sale Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={prop.consideration}
                    onChange={(e) => updateProperty(idx, 'consideration', e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col justify-end gap-3 sm:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={prop.debtSatisfied}
                      onChange={(e) => updateProperty(idx, 'debtSatisfied', e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">Debt Satisfied</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={prop.filingNeeded}
                      onChange={(e) => updateProperty(idx, 'filingNeeded', e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">
                      Filing Coordination Needed{' '}
                      <span className="text-slate-400">(+$75/property)</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Grantor / Grantee */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Grantor */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Grantor (Current Owner)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={prop.grantor.name}
                        onChange={(e) => updateProperty(idx, 'grantor.name', e.target.value)}
                        placeholder="Full legal name or entity name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Entity Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={prop.grantor.entity}
                        onChange={(e) => updateProperty(idx, 'grantor.entity', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        {ENTITY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Grantee */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Grantee (New Owner)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={prop.grantee.name}
                        onChange={(e) => updateProperty(idx, 'grantee.name', e.target.value)}
                        placeholder="Full legal name or entity name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-700">
                        Entity Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={prop.grantee.entity}
                        onChange={(e) => updateProperty(idx, 'grantee.entity', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        {ENTITY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* ── Add Property ──────────────────────────────────────────── */}
          <div className="text-center">
            <button
              type="button"
              onClick={addProperty}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-500 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-white hover:text-white transition-colors"
            >
              + Add Another Property
            </button>
          </div>

          {/* ── Submit ────────────────────────────────────────────────── */}
          <div className="pb-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-10 py-4 text-base font-bold text-white hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                'Submit Request'
              )}
            </button>
            <p className="mt-3 text-xs text-slate-500">
              You'll receive a quote within 4 hours at the email provided.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
