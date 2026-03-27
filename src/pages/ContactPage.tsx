import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
                    <a href="mailto:jason@therealhelp.com" className="text-brand-black font-medium hover:text-brand-blue-500">
                      jason@therealhelp.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-silver-400 uppercase tracking-wide">Phone</p>
                    <a href="tel:+13146602890" className="text-brand-black font-medium hover:text-brand-blue-500">
                      (314) 660-2890
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
                  Prefer to talk directly? Book a 30-minute discovery call.
                </p>
                <a
                  href="#book"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors"
                >
                  Schedule a Call <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* St. Louis Gateway Arch illustration */}
              <div className="mt-8 flex justify-center" aria-hidden="true">
                <svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs opacity-80">
                  {/* Ground */}
                  <line x1="0" y1="252" x2="400" y2="252" stroke="#E4E4E7" strokeWidth="1.5" />
                  {/* Left skyline buildings */}
                  <rect x="10" y="222" width="22" height="30" fill="#F4F4F5" rx="1" />
                  <rect x="36" y="212" width="18" height="40" fill="#E4E4E7" rx="1" />
                  <rect x="37" y="204" width="4" height="10" fill="#E4E4E7" rx="1" />
                  <rect x="58" y="226" width="26" height="26" fill="#F4F4F5" rx="1" />
                  <rect x="88" y="216" width="14" height="36" fill="#D4D4D8" rx="1" />
                  {/* Right skyline buildings */}
                  <rect x="298" y="220" width="14" height="32" fill="#D4D4D8" rx="1" />
                  <rect x="316" y="210" width="26" height="42" fill="#E4E4E7" rx="1" />
                  <rect x="317" y="202" width="4" height="10" fill="#E4E4E7" rx="1" />
                  <rect x="346" y="216" width="20" height="36" fill="#F4F4F5" rx="1" />
                  <rect x="370" y="224" width="22" height="28" fill="#E4E4E7" rx="1" />
                  {/* Gateway Arch */}
                  <path
                    d="M 128 252 C 128 186, 193 65, 200 34 C 207 65, 272 186, 272 252"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />
                  {/* Arch highlight shimmer */}
                  <path
                    d="M 131 252 C 131 189, 195 69, 200 38 C 205 69, 269 189, 269 252"
                    fill="none"
                    stroke="#5C84FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                  {/* Label */}
                  <text x="200" y="268" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontFamily="system-ui, sans-serif" letterSpacing="2">
                    ST. LOUIS, MISSOURI
                  </text>
                </svg>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-2xl bg-brand-silver-50 p-12 text-center">
                  <div>
                    <p className="font-heading text-3xl font-bold text-brand-black">Got it.</p>
                    <p className="mt-3 text-brand-silver-500">
                      I&apos;ll review your message and get back to you within 1 business day.
                    </p>
                  </div>
                </div>
              ) : (
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
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-blue-500 px-8 py-4 text-base font-bold text-white hover:bg-brand-blue-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
