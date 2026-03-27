import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CardVisual } from '@/components/illustrations/CardVisual';

const CASE_STUDIES = [
  {
    title: 'Scheduler Pro',
    category: 'App Development',
    description: 'A full workforce scheduling application built for CDS agencies managing caregiver shifts, availability, and EVV alignment.',
    metrics: [
      { label: 'Scheduling time reduced', value: '80%' },
      { label: 'Manual errors eliminated', value: '100%' },
      { label: 'Agencies onboarded', value: '3' },
    ],
    tags: ['React', 'Firebase', 'CDS', 'Healthcare'],
    screenshot: '/images/work/scheduler-pro.png',
    liveUrl: 'https://scheduler-pro-five.vercel.app/',
  },
  {
    title: 'Kidz Transportation',
    category: 'App Development',
    description: 'A full-featured web app for a youth transportation business — driver management, route scheduling, parent notifications, and ride tracking all in one platform.',
    metrics: [
      { label: 'Routes managed', value: '100+' },
      { label: 'Manual dispatch eliminated', value: '90%' },
      { label: 'On-time rate', value: '98%' },
    ],
    tags: ['React', 'Firebase', 'Transportation', 'Scheduling'],
    screenshot: '/images/work/kidz.png',
    liveUrl: 'https://kidz-transportation.web.app/',
  },
  {
    title: 'GCA EVV Compliance System',
    category: 'Medicaid / CDS',
    description: 'End-to-end EVV compliance workflow for Golden Care Alliance — aligning caregiver check-ins, billing, and audit documentation.',
    metrics: [
      { label: 'Audit pass rate', value: '100%' },
      { label: 'Billing denials reduced', value: '90%' },
      { label: 'Time to reconcile weekly billing', value: '2 hrs' },
    ],
    tags: ['Medicaid', 'EVV', 'Compliance', 'Automation'],
    screenshot: null,
    liveUrl: null,
  },
  {
    title: 'CertifiedSTL',
    category: 'Compliance & Certification',
    description: 'A guided platform helping Missouri businesses navigate MBE/WBE/DBE certification applications without getting lost in the process.',
    metrics: [
      { label: 'Avg. certification timeline', value: '30 days' },
      { label: 'Success rate', value: '94%' },
      { label: 'Businesses assisted', value: '20+' },
    ],
    tags: ['MBE', 'WBE', 'DBE', 'Missouri', 'Certification'],
    screenshot: null,
    liveUrl: null,
  },
  {
    title: 'Provider Automation System',
    category: 'AI & Automation',
    description: 'AI-powered document processing and automated reporting for a healthcare provider reducing manual administrative work by 15 hours/week.',
    metrics: [
      { label: 'Hours saved per week', value: '15+' },
      { label: 'Report generation time', value: '5 min' },
      { label: 'Manual data entry eliminated', value: '100%' },
    ],
    tags: ['AI', 'Automation', 'Healthcare', 'Google Workspace'],
    screenshot: null,
    liveUrl: null,
  },
];

function BrowserMockup({ src, alt, liveUrl }: { src: string; alt: string; liveUrl: string }) {
  return (
    <div className="relative overflow-hidden bg-brand-silver-100 border-b border-brand-silver-200">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 bg-brand-silver-200 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-xs text-brand-silver-500 truncate">
          {liveUrl.replace('https://', '')}
        </div>
      </div>
      {/* Screenshot */}
      <img
        src={src}
        alt={alt}
        className="w-full object-cover object-top"
        style={{ maxHeight: '13rem' }}
        loading="lazy"
      />
      {/* Live link overlay */}
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-brand-black/0 hover:bg-brand-black/40 transition-all group"
        aria-label={`View ${alt} live`}
      >
        <span className="hidden group-hover:flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-black shadow-elevated">
          View Live Site <ExternalLink className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}

export default function WorkPage() {
  return (
    <div>
      <Helmet>
        <title>Our Work | St. Louis Business & Tech Solutions | The Real Help, LLC</title>
        <meta name="description" content="Case studies from The Real Help, LLC — workforce scheduling apps, EVV compliance systems, MWBE certification platforms, and provider automation built in St. Louis." />
        <link rel="canonical" href="https://therealhelp.com/work" />
      </Helmet>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl">Work</h1>
            <p className="mt-4 text-lg text-brand-silver-500 max-w-2xl mx-auto">
              Real projects. Real results. No case study fluff.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.title} className="rounded-2xl border border-brand-silver-200 bg-white overflow-hidden hover:shadow-elevated transition-all">
                {cs.screenshot && cs.liveUrl ? (
                  <BrowserMockup src={cs.screenshot} alt={cs.title} liveUrl={cs.liveUrl} />
                ) : (
                  <CardVisual category={cs.category} />
                )}
                <div className="p-8">
                  <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue-500 mb-4">
                    {cs.category}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-brand-black">{cs.title}</h2>
                  <p className="mt-3 text-brand-silver-500 leading-relaxed">{cs.description}</p>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="font-heading text-2xl font-extrabold text-brand-blue-500">{m.value}</p>
                        <p className="mt-1 text-xs text-brand-silver-400 leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-brand-silver-100 px-2 py-1 text-xs font-medium text-brand-silver-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {cs.liveUrl && (
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-blue-500 px-5 py-2.5 text-sm font-bold text-brand-blue-500 hover:bg-brand-blue-50 transition-colors"
                    >
                      View Live Site <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-brand-blue-500 p-10 text-center text-white">
            <h2 className="font-heading text-3xl font-bold">Have a project in mind?</h2>
            <p className="mt-3 text-blue-100">Let&apos;s talk about what you need and how I can build it.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-blue-500 hover:bg-brand-silver-50 transition-colors"
            >
              Start a Conversation <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
