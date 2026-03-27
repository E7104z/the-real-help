import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Microscope,
  Laptop2,
  Landmark,
  BarChart3,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

type BackgroundItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  bullets: string[];
  meaning: string;
};

function BackgroundItem({
  icon,
  title,
  subtitle,
  bullets,
  meaning,
}: BackgroundItemProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <span className="leading-7">{bullet}</span>
          </li>
        ))}
      </ul>

      {meaning ? (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-slate-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">
            What this means
          </p>
          <p className="mt-2 leading-7 text-slate-700">{meaning}</p>
        </div>
      ) : null}
    </div>
  );
}

const backgroundItems: BackgroundItemProps[] = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: 'Business Owner — Golden Care Alliance, LLC',
    subtitle: 'Consumer Directed Services (CDS) home healthcare provider',
    bullets: [
      'Manages Medicaid-based service delivery and compliance.',
      'Oversees caregiver payroll, scheduling, and EVV alignment.',
      'Ensures care plans, documentation, and billing are fully synchronized.',
      'Operates within strict state and federal regulatory frameworks.',
    ],
    meaning:
      "You're working with someone who actively runs a regulated healthcare business — not just advises on one.",
  },
  {
    icon: <Microscope className="h-6 w-6" />,
    title: 'Business Owner — Quantum Laboratory',
    subtitle: 'Diagnostic and drug testing laboratory',
    bullets: [
      'Operates within clinical, diagnostic, and drug testing environments.',
      'Navigates specimen handling, reporting standards, and compliance requirements.',
      'Aligns operations with regulatory expectations and industry protocols.',
      'Builds systems for accuracy, efficiency, and reliability.',
    ],
    meaning:
      "You're working with someone who understands high-stakes compliance where precision and process control matter.",
  },
  {
    icon: <Laptop2 className="h-6 w-6" />,
    title: 'Systems & Technology Developer',
    subtitle: 'Custom systems and full-stack application builder',
    bullets: [
      'Builds business automation systems using AI, Google Workspace, and cloud tools.',
      'Develops CRM, scheduling, portal, and workflow applications.',
      'Designs scalable systems that replace manual processes.',
      'Creates tools built for real-world operations — not just demos.',
    ],
    meaning:
      "You're not just getting advice — you're getting someone who can actually build the system that solves the problem.",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: 'St. Louis City Hall — Business Assistance Center',
    subtitle: 'Worked directly with business owners navigating city systems',
    bullets: [
      'Guided startups through licensing and compliance requirements.',
      'Helped business owners understand regulatory approvals.',
      'Supported businesses transitioning into full compliance.',
      'Served as a bridge between government systems and entrepreneurs.',
    ],
    meaning:
      "You're working with someone who understands your position because he has helped people through these systems firsthand.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'St. Louis Development Corporation — M/WBE Certification',
    subtitle: 'Specialized in evaluating businesses for government certification',
    bullets: [
      'Analyzed ownership, control, and financial documentation.',
      'Reviewed tax returns, contracts, and operational structures.',
      'Identified compliance risks and pass-through issues.',
      'Determined eligibility for participation in public contracting programs.',
    ],
    meaning:
      "You're working with someone who knows exactly how businesses are evaluated — and what it takes to qualify.",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Bachelor's Degree in Business",
    subtitle: '1999 · University of Arkansas at Pine Bluff',
    bullets: [],
    meaning: '',
  },
];

export default function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About Jason Griffin | St. Louis Business Consultant</title>
        <meta name="description" content="Jason Griffin is a St. Louis business consultant with experience in government operations, Medicaid systems, MWBE certification, and custom app development." />
        <link rel="canonical" href="https://therealhelp.com/about" />
      </Helmet>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-20 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-slate-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.45fr] items-start">
            {/* Left sticky card */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Photo */}
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50" style={{ minHeight: '32rem' }}>
                <img
                  src="/images/about/IMG_5683.png"
                  alt="Jason Griffin, founder of The Real Help, LLC — St. Louis business consultant"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-90deg) scale(1.5)', minHeight: '32rem' }}
                  loading="lazy"
                />
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-7 shadow-xl shadow-slate-200/50 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
                  <Briefcase className="h-4 w-4" />
                  About Jason Griffin
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Where I <span className="text-blue-700">Came From</span>
                </h1>

                <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
                  <p>
                    I built my foundation in the part of business most people avoid
                    — <span className="font-semibold text-slate-900">compliance, government systems, and regulated industries</span>.
                  </p>
                  <p>
                    This is where the rules are strict, the margins for error are
                    small, and the consequences are real.
                  </p>
                  <p>
                    From <span className="font-semibold text-slate-900">Medicaid operations and EVV reporting</span> to{' '}
                    <span className="font-semibold text-slate-900">
                      city licensing, certification, and laboratory environments
                    </span>
                    , I learned how systems actually work — not just on paper, but
                    in practice.
                  </p>
                  <p>
                    That experience is what allows me to help businesses move
                    correctly, avoid costly mistakes, and operate with confidence.
                  </p>
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    What makes me different
                  </p>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    Most consultants operate from theory.
                  </p>

                  <ul className="mt-4 space-y-3">
                    {[
                      'Real businesses',
                      'Real compliance environments',
                      'Real systems that have to work',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-800">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-700" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 leading-7 text-slate-600">
                    I&apos;ve seen how businesses succeed — and how they fail — inside
                    the systems that control opportunity.
                  </p>
                </div>

                <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                    What you can expect
                  </p>

                  <ul className="mt-4 space-y-3 text-slate-200">
                    {[
                      'Clear, practical guidance',
                      'Systems that actually work',
                      'Straightforward communication',
                      'A partner who understands your position',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-base font-medium text-white">
                      No pressure. No confusion. No judgment.
                    </p>
                    <p className="mt-1 text-lg font-bold text-blue-300">
                      Just real help.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right content */}
            <div>
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Professional Background
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Experience built in real systems.
                </h3>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                  My work spans business ownership, healthcare operations,
                  diagnostic laboratory environments, government systems,
                  certification review, and full-stack technology development.
                </p>
              </div>

              <div className="grid gap-6">
                {backgroundItems.map((item) => (
                  <BackgroundItem key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Internal links — CTA row */}
          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              View Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-blue-500 px-6 py-3 text-base font-semibold text-brand-blue-500 hover:bg-brand-blue-50 transition-colors"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
