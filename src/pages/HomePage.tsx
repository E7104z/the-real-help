import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Cog, Code, Brain, Star, CheckCircle, Paintbrush } from 'lucide-react';
import { BenefitsTicker } from '@/components/BenefitsTicker';

const TICKER_ITEMS = [
  'Affordable Full-Stack Web Apps in Days',
  'MWBE Certification Setup',
  'Medicaid / CDS Expert',
  'Business Automation with AI',
  'Custom Client Portals',
  'Google Workspace Business Systems',
  'CRM and Workflow Builds',
  'Branding, Tech, and Operations Under One Roof',
];

const SERVICES_PREVIEW = [
  {
    icon: Shield,
    title: 'Compliance & Certification',
    description: 'MBE/WBE/DBE strategy, Medicaid compliance, and government contracting readiness.',
  },
  {
    icon: Cog,
    title: 'Business Systems',
    description: 'Automate your operations with Google Workspace, custom workflows, and smart processes.',
  },
  {
    icon: Code,
    title: 'App Development',
    description: 'Full-stack web applications built for real business needs — not tech demos.',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'AI-powered workflows that save hours per week without requiring a CS degree.',
  },
  {
    icon: Paintbrush,
    title: 'Branding & Design',
    description: 'Logo design, brand identity, capability statements, and marketing collateral.',
  },
];

const TRUST_ITEMS = [
  'Government Contracting',
  'Medicaid / CDS',
  'Tech & SaaS',
  'Small Business',
  'Certification',
  'Branding & Design',
];

const TESTIMONIALS = [
  {
    quote: "He didn't just give us advice — he built the actual system and walked us through every step. We went from overwhelmed to organized in two weeks.",
    name: 'CDS Agency Owner',
    location: 'St. Louis, MO',
  },
  {
    quote: "I'd been trying to get my MBE certification for months. He got to the root of what was holding us up and cleared the path. Done in 30 days.",
    name: 'Small Business Owner',
    location: 'Missouri',
  },
  {
    quote: "Most consultants talk. This one builds. Our scheduling app went from mess to machine.",
    name: 'Healthcare Operations Director',
    location: 'St. Louis, MO',
  },
];

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Business Consultant St. Louis | The Real Help, LLC</title>
        <meta name="description" content="St. Louis business consultant delivering MWBE certification, Medicaid CDS compliance, web app development, and AI automation. Real solutions, real fast." />
        <link rel="canonical" href="https://therealhelp.com/" />
      </Helmet>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* St. Louis skyline silhouette background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
          <img
            src="/images/branding/stl%20sil.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto opacity-[0.08]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Business Services headline */}
          <div className="pt-6">
            <p className="text-center font-heading text-3xl font-bold tracking-wide text-brand-black sm:text-4xl">
              Business Services
            </p>
          </div>
          {/* Ticker */}
          <div className="pt-4 pb-4">
            <BenefitsTicker items={TICKER_ITEMS} />
          </div>

          <div className="grid items-center gap-12 py-6 md:py-10 lg:grid-cols-2 lg:py-14">
            {/* Text side */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-blue-50 px-6 py-2.5 text-lg font-medium text-brand-blue-600 border border-brand-blue-200">
                <Star className="h-5 w-5" />
                St. Louis-Based.
              </div>
              <h1 className="font-heading text-4xl font-extrabold leading-tight text-brand-black sm:text-5xl lg:text-6xl">
                The Guy Who{' '}
                <span className="text-brand-blue-500">Actually</span>{' '}
                Fixes It.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-brand-silver-500 sm:text-xl max-w-xl mx-auto lg:mx-0">
                I help business owners cut through red tape, build real systems,
                and get certified — without the runaround. Compliance, tech,
                branding, and operations — all under one roof.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-blue-600 transition-all hover:shadow-xl"
                >
                  Let&apos;s Talk
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-silver-300 px-8 py-4 text-base font-semibold text-brand-black hover:border-brand-blue-500 hover:text-brand-blue-500 transition-colors"
                >
                  See My Work
                </Link>
              </div>
            </div>

            {/* Portrait photo */}
            <div className="flex justify-center">
              <img
                src="/images/hero/hero.png"
                alt="Jason Griffin, St. Louis business consultant at The Real Help, LLC"
                className="w-auto max-h-[40rem] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST BAR ═══════════════ */}
      <section className="border-b border-brand-silver-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="text-sm font-semibold tracking-wide text-brand-silver-400 uppercase">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT I DO ═══════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-black sm:text-4xl">What I Do</h2>
            <p className="mt-4 text-lg text-brand-silver-500 max-w-2xl mx-auto">
              One person. Multiple capabilities. No passing you off to a junior.
              When you work with me, you work with <em>me</em>.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_PREVIEW.map((svc) => (
              <div key={svc.title} className="rounded-2xl border border-brand-silver-200 bg-white p-6 hover:border-brand-blue-300 hover:shadow-soft transition-all">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500">
                  <svc.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-black">{svc.title}</h3>
                <p className="mt-2 text-sm text-brand-silver-500 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-blue-500 font-semibold hover:underline">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 sm:py-28 bg-brand-silver-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-black sm:text-4xl">What Clients Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-8 shadow-card border border-brand-silver-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-blue-500 text-brand-blue-500" />
                  ))}
                </div>
                <p className="text-brand-silver-600 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-brand-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{t.name}</p>
                    <p className="text-xs text-brand-silver-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-20 bg-brand-blue-500">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to Stop Spinning Your Wheels?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Tell me what you need. I&apos;ll tell you if I can help — no pressure, no pitch, no confusion.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-blue-500 shadow-lg hover:bg-brand-silver-50 transition-colors"
          >
            Let&apos;s Talk
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
