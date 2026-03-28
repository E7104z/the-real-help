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
                <svg viewBox="0 0 500 330" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
                  <defs>
                    <linearGradient id="arch-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0e2a60" />
                      <stop offset="100%" stopColor="#2d6ab0" />
                    </linearGradient>
                    <linearGradient id="arch-left" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2c4a68" />
                      <stop offset="28%" stopColor="#6e96b4" />
                      <stop offset="50%" stopColor="#c4dcf0" />
                      <stop offset="72%" stopColor="#7aaac6" />
                      <stop offset="100%" stopColor="#426880" />
                    </linearGradient>
                    <linearGradient id="arch-right" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#426880" />
                      <stop offset="28%" stopColor="#7aaac6" />
                      <stop offset="50%" stopColor="#c4dcf0" />
                      <stop offset="72%" stopColor="#6e96b4" />
                      <stop offset="100%" stopColor="#2c4a68" />
                    </linearGradient>
                    <linearGradient id="arch-ground" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#336622" />
                      <stop offset="100%" stopColor="#1e4012" />
                    </linearGradient>
                  </defs>

                  {/* Sky */}
                  <rect width="500" height="290" fill="url(#arch-sky)" />

                  {/* City skyline silhouette */}
                  <g fill="#091e3d" opacity="0.65">
                    <rect x="5" y="252" width="24" height="38" />
                    <rect x="32" y="238" width="16" height="52" />
                    <rect x="34" y="229" width="3" height="10" />
                    <rect x="52" y="256" width="30" height="34" />
                    <rect x="86" y="246" width="14" height="44" />
                    <rect x="104" y="260" width="22" height="30" />
                    <rect x="374" y="260" width="22" height="30" />
                    <rect x="400" y="246" width="14" height="44" />
                    <rect x="418" y="256" width="30" height="34" />
                    <rect x="452" y="238" width="16" height="52" />
                    <rect x="462" y="229" width="3" height="10" />
                    <rect x="471" y="252" width="24" height="38" />
                  </g>

                  {/* Ground / grass */}
                  <rect y="290" width="500" height="40" fill="url(#arch-ground)" />

                  {/* LEFT LEG — filled tapered catenary shape */}
                  <path
                    d="M 70,290 C 68,158 216,50 247,34 L 253,38 C 230,54 104,162 104,290 Z"
                    fill="url(#arch-left)"
                  />

                  {/* RIGHT LEG — mirror */}
                  <path
                    d="M 430,290 C 432,158 284,50 253,34 L 247,38 C 270,54 396,162 396,290 Z"
                    fill="url(#arch-right)"
                  />

                  {/* Apex highlight */}
                  <ellipse cx="250" cy="36" rx="4" ry="3" fill="#ddeeff" opacity="0.75" />

                  {/* Concrete base pads */}
                  <rect x="62" y="284" width="48" height="10" rx="1" fill="#567a90" />
                  <rect x="390" y="284" width="48" height="10" rx="1" fill="#567a90" />

                  {/* Label */}
                  <text x="250" y="318" textAnchor="middle" fill="#7aaeca" fontSize="9"
                    fontFamily="system-ui,sans-serif" letterSpacing="3" fontWeight="500">
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
                    Let&apos;s Start the Conversation
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
