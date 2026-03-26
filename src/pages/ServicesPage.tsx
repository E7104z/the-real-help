import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Cog, Code, Brain, Paintbrush, FileText, ArrowRight, Building } from 'lucide-react';

export const SERVICE_CATEGORIES = [
  {
    slug: 'compliance-certification',
    icon: Shield,
    title: 'Compliance & Certification',
    tagline: 'Navigate the systems most people avoid.',
    description: 'MBE/WBE/DBE certification strategy, Medicaid provider setup, government contracting readiness, and regulatory compliance.',
    process: ['Initial compliance audit', 'Documentation review and gap analysis', 'Certification application preparation', 'Submission and follow-through'],
    included: ['Certification eligibility review', 'Application package preparation', 'Regulatory compliance checklist', 'Follow-up and resubmission support'],
    result: 'A business that is certified, compliant, and positioned to compete for contracts.',
  },
  {
    slug: 'business-systems',
    icon: Cog,
    title: 'Business Systems',
    tagline: 'Replace manual chaos with real processes.',
    description: 'Google Workspace setup, workflow automation, operations documentation, and scalable systems that grow with your business.',
    process: ['Operations assessment', 'System design and mapping', 'Build and configuration', 'Training and handoff'],
    included: ['Google Workspace full setup', 'Workflow documentation', 'SOP creation', 'Staff training'],
    result: 'A business that runs on systems, not on you.',
  },
  {
    slug: 'app-development',
    icon: Code,
    title: 'App Development',
    tagline: 'Real applications for real business problems.',
    description: 'Full-stack web apps, client portals, scheduling tools, and custom dashboards — built fast, built to last.',
    process: ['Requirements scoping', 'Design and architecture', 'Development and testing', 'Launch and support'],
    included: ['Custom web application', 'Admin dashboard', 'User authentication', 'Hosting and deployment'],
    result: 'A working application that saves time and money from day one.',
  },
  {
    slug: 'ai-automation',
    icon: Brain,
    title: 'AI & Automation',
    tagline: 'Do more without hiring more.',
    description: 'AI-powered workflows, automated reporting, smart document processing, and integrations that eliminate repetitive tasks.',
    process: ['Workflow audit', 'Automation opportunity mapping', 'Build and integration', 'Testing and optimization'],
    included: ['AI workflow design', 'Tool integration setup', 'Automated reporting', 'Documentation'],
    result: 'Hours saved every week without additional headcount.',
  },
  {
    slug: 'branding-design',
    icon: Paintbrush,
    title: 'Branding & Design',
    tagline: 'Look like the business you are.',
    description: 'Logo design, brand identity systems, capability statements, pitch decks, and marketing materials.',
    process: ['Brand discovery session', 'Concept development', 'Design and refinement', 'Final delivery and files'],
    included: ['Logo design (multiple formats)', 'Color palette and typography', 'Brand style guide', 'Capability statement'],
    result: 'A brand that reflects professionalism and earns trust.',
  },
  {
    slug: 'medicaid-cds',
    icon: FileText,
    title: 'Medicaid / CDS Operations',
    tagline: 'EVV, billing, and compliance — handled.',
    description: 'CDS agency setup, EVV system alignment, Medicaid billing processes, care plan documentation, and provider credentialing.',
    process: ['Agency compliance review', 'EVV alignment and setup', 'Billing process documentation', 'Staff training'],
    included: ['EVV system review', 'Billing workflow setup', 'Compliance documentation', 'Ongoing support guidance'],
    result: 'A Medicaid operation that passes audits and gets paid on time.',
  },
  {
    slug: 'government-contracting',
    icon: Building,
    title: 'Government Contracting',
    tagline: 'Get in position to win public contracts.',
    description: 'Capability statement development, SAM.gov registration, set-aside strategy, and bid preparation support.',
    process: ['Readiness assessment', 'Registration and documentation', 'Capability statement development', 'Opportunity identification'],
    included: ['SAM.gov registration support', 'Capability statement', 'Set-aside strategy', 'Bid preparation guidance'],
    result: 'A business registered, positioned, and ready to compete for government contracts.',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <Helmet>
        <title>Business Services St. Louis | The Real Help, LLC</title>
        <meta name="description" content="Compliance certification, business systems, app development, AI automation, branding, Medicaid CDS, and government contracting — all delivered in St. Louis." />
        <link rel="canonical" href="https://therealhelp.com/services" />
      </Helmet>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl">Services</h1>
            <p className="mt-4 text-lg text-brand-silver-500 max-w-2xl mx-auto">
              Every service is delivered by me — not a team, not a junior, not an overseas contractor.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="group rounded-2xl border border-brand-silver-200 bg-white p-6 hover:border-brand-blue-400 hover:shadow-elevated transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500 group-hover:bg-brand-blue-500 group-hover:text-white transition-colors">
                  <svc.icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-xl font-bold text-brand-black">{svc.title}</h2>
                <p className="mt-1 text-sm font-medium text-brand-blue-500">{svc.tagline}</p>
                <p className="mt-3 text-sm text-brand-silver-500 leading-relaxed">{svc.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-500">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
