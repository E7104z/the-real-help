import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Mail, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase/functions';
import { CONTACT_EMAIL, BOOKING_URL, isExternalUrl } from '@/lib/constants/site';

const SERVICES = [
  'Compliance & Certification',
  'Business Systems',
  'App Development',
  'AI & Automation',
  'Branding & Design',
  'Medicaid / CDS',
  'Government Contracting',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const submit = httpsCallable(functions, 'submitContactForm');
      await submit(form);
      setSubmitted(true);
    } catch {
      setError(`Something went wrong. Please try again or email ${CONTACT_EMAIL} directly.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Contact a St. Louis Business Consultant | The Real Help, LLC</title>
        <meta name="description" content="Get in touch with The Real Help, LLC. St. Louis business consulting, MWBE certification, Medicaid CDS compliance, and web app development. No pitch, no pressure." />
        <link rel="canonical" href="https://therealhelp.com/contact" />
      </Helmet>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl">
                Let&apos;s Talk
              </h1>
              <p className="mt-4 text-lg text-brand-silver-500 leading-relaxed max-w-lg">
                Tell me what you are working on. I will tell you if I can help — no pitch, no pressure, no confusion.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-silver-400 uppercase tracking-wide">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-black font-medium hover:text-brand-blue-500">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-silver-400 uppercase tracking-wide">Location</p>
                    <p className="text-brand-black font-medium">St. Louis, Missouri</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl bg-brand-silver-50 border border-brand-silver-200 p-6">
                <p className="font-heading text-xl font-bold text-brand-black">Book a Free Call</p>
                <p className="mt-2 text-sm text-brand-silver-500">
                  Prefer to talk directly? Book a 30-minute discovery call — no obligation.
                </p>
                <a
                  href={BOOKING_URL}
                  target={isExternalUrl(BOOKING_URL) ? '_blank' : undefined}
                  rel={isExternalUrl(BOOKING_URL) ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors"
                >
                  Schedule a Call <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-2xl bg-brand-silver-50 p-12 text-center">
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-heading text-3xl font-bold text-brand-black">Message sent.</p>
                    <p className="mt-3 text-brand-silver-500">
                      I&apos;ll get back to you within 1 business day. Check your inbox for a confirmation.
                    </p>
                    <p className="mt-6 text-sm text-brand-silver-400">Want to talk sooner?</p>
                    <a
                      href={BOOKING_URL}
                      target={isExternalUrl(BOOKING_URL) ? '_blank' : undefined}
                      rel={isExternalUrl(BOOKING_URL) ? 'noopener noreferrer' : undefined}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors"
                    >
                      Book a Free Call <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mb-6 rounded-xl border border-brand-blue-100 bg-brand-blue-50 px-5 py-4 text-sm text-brand-blue-700 leading-relaxed">
                    <strong>First conversation is always free.</strong> No pitch, no pressure — just a real talk about what you need.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                      placeholder="(314) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">What area do you need help with?</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 bg-white"
                    >
                      <option value="">Select a service (optional)</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">What do you need help with? *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200 resize-none"
                      placeholder="Tell me about your situation..."
                    />
                  </div>
                  {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue-500 px-8 py-4 text-base font-bold text-white hover:bg-brand-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      "Let's Start the Conversation"
                    )}
                  </button>
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
