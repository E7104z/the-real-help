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
                    <a href="tel:+13141234567" className="text-brand-black font-medium hover:text-brand-blue-500">
                      (314) 123-4567
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
