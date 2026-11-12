import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Landmark, FileCheck, Building2 } from 'lucide-react';
import { FadeIn, StaggerChildren } from '../../components/animation';
import StructuredData from '../../components/seo/StructuredData';
import SeoHead from '../../components/seo/SeoHead';

const seoContent = {
  title: 'Government Contracting Consultant St. Louis | Bid & Certification Help',
  description:
    'Government contracting consultant in St. Louis helping small businesses bid on city, state, and federal contracts. MBE/DBE certification strategy, capability statements, B2GNow navigation, and prime contractor positioning.',
  keywords: [
    'government contracting consultant St. Louis',
    'government contract bidding Missouri',
    'MBE subcontractor St. Louis',
    'B2GNow help Missouri',
    'capability statement writer St. Louis',
    'MODOT bid preparation',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a government contracting consultant do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A government contracting consultant helps small businesses navigate the complex process of selling to government agencies. This includes identifying bid opportunities, preparing capability statements and proposals, obtaining required certifications (MBE, WBE, DBE, 8(a)), navigating procurement portals like B2GNow and SAM.gov, understanding compliance requirements like CUF and BABAA, and building relationships with prime contractors who need diverse subcontractors. In St. Louis, this means helping businesses win contracts with the City of St. Louis, St. Louis County, MODOT, Metro/Bi-State, MSD, and federal agencies with a local presence.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I bid on government contracts in Missouri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bidding on Missouri government contracts starts with getting registered in the right systems: SAM.gov (federal), MissouriBUYS (state), B2GNow (SLDC/MODOT), and individual agency vendor portals. You\'ll need a capability statement, proof of certifications (if applicable), insurance documentation, and a response that directly addresses the solicitation requirements. THE REAL HELP, LLC helps you navigate each portal, prepare bid packages, and develop competitive pricing strategies. We also help you position as a subcontractor to prime contractors who hold large government contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications do I need for government contracts in St. Louis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The certifications that matter most for St. Louis government contracts are: SLDC MBE/WBE (City of St. Louis contracts with MWBE participation goals), Missouri OEO MBE/WBE (state agency contracts), MODOT DBE (federally-funded transportation contracts), and federal certifications like SBA 8(a), WOSB, SDVOSB, and HUBZone. Each certification unlocks different contracting opportunities. We assess your business and recommend the certifications with the highest return on effort for your specific industry and target agencies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I bid as a prime contractor or subcontractor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most small businesses in St. Louis make more money as subcontractors to large primes than as primes themselves — especially when starting out. Primes carry the bonding, insurance, and performance risk. Your job as a sub is to deliver your scope on time and on budget. However, bidding as a prime on smaller set-aside contracts (under $150K) can be highly profitable if you have the certifications and operational capacity. We analyze your financials, bonding capacity, and staffing to recommend the right approach for each opportunity.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Government Contracting Consulting St. Louis',
  provider: {
    '@type': 'LocalBusiness',
    name: 'THE REAL HELP, LLC',
    address: { '@type': 'PostalAddress', addressLocality: 'St. Louis', addressRegion: 'MO', addressCountry: 'US' },
  },
  areaServed: { '@type': 'City', name: 'St. Louis' },
  description:
    'Government contracting consulting services for St. Louis small businesses — bid preparation, certification strategy, and procurement navigation.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'THE REAL HELP, LLC',
  url: 'https://therealhelp.com',
  telephone: '+1-314-123-4567',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'St. Louis',
    addressRegion: 'MO',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'St. Louis',
    sameAs: 'https://en.wikipedia.org/wiki/St._Louis',
  },
  sameAs: ['https://linkedin.com/company/the-real-help', 'https://facebook.com/TheRealHelpLLC'],
};

const pageData = {
  hero: {
    eyebrow: 'High Intent · St. Louis',
    title: 'Government Contracting Consultant St. Louis',
    subtitle:
      'Government contracts in Missouri are real money — but the process is designed to filter out the unprepared. We help small businesses get certified, find the right bids, and submit proposals that win. No guesswork. Just a clear path from where you are to your first government check.',
    cta: 'Get a Bid Readiness Assessment',
    ctaLink: '/property-transfer',
  },
  services: [
    {
      icon: <Landmark className="w-6 h-6 text-[#c0a36b]" />,
      title: 'Certification Strategy',
      desc: 'Identify which certifications (SLDC MBE, MO OEO, MODOT DBE, 8(a)) open doors for your specific industry and target agencies.',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#c0a36b]" />,
      title: 'Bid Preparation',
      desc: 'Capability statements, pricing strategies, technical responses, and past performance documentation that meets solicitation requirements.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#c0a36b]" />,
      title: 'Prime Contractor Positioning',
      desc: 'Learn how primes evaluate MBE subcontractors and how to market your certification before the RFP drops.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#c0a36b]" />,
      title: 'Post-Award Compliance',
      desc: 'Certified payroll, MWBE utilization tracking, progress reports — the infrastructure that turns your first contract into your second.',
    },
  ],
  howItWorks: {
    title: 'How the Government Bidding Process Works in Missouri',
    steps: [
      {
        step: '1',
        title: 'Get Certified First',
        text: 'Most city and state contracts with MWBE goals require you to be certified before the bid deadline — not after. SLDC MBE/WBE certification takes 45–90 days, MODOT DBE can take 3–6 months. Start certification before you find the bid.',
      },
      {
        step: '2',
        title: 'Register in Procurement Portals',
        text: 'SAM.gov (federal), MissouriBUYS (state), B2GNow (SLDC/MODOT), and Metro/Bi-State all maintain separate vendor databases. You need active, accurate registrations in each portal where you want to bid.',
      },
      {
        step: '3',
        title: 'Find the Right Solicitations',
        text: 'Not every bid is worth pursuing. We evaluate opportunities based on your capacity, the agency\'s history with similar vendors, incumbency status, MWBE goal percentages, and whether the scope fits your core competence.',
      },
      {
        step: '4',
        title: 'Build a Compliant Response',
        text: 'Government bids are evaluated on responsiveness to the solicitation — not on how impressive your company is. Missing a required form or failing to address evaluation criteria gets you thrown out before anyone reads your pricing.',
      },
    ],
  },
  primeVsSub: {
    title: 'Bid as Prime or Sub? Making the Right Call',
    paragraphs: [
      'Most small businesses in St. Louis make more money as subcontractors to large primes than as primes themselves — especially when starting out. Primes carry the bonding, insurance, and performance risk. Your job as a sub is to deliver your scope on time and on budget while the prime handles the administrative burden.',
      'However, bidding as a prime on smaller set-aside contracts (under $150K) can be highly profitable if you have the certifications and operational capacity. We analyze your financials, bonding capacity, insurance status, and staffing to recommend the right approach for each opportunity.',
      'On large MODOT and City of St. Louis contracts, the MWBE participation goal is often 15–25%. Primes actively seek certified firms to meet those goals — meaning your certification is a business development asset, not just a credential. We teach you how to market your certification to primes before the RFP even drops.',
    ],
  },
  socialProof: {
    quote:
      '"We had no idea where to start with government contracts. THE REAL HELP got us SLDC certified, registered in B2GNow, and helped us land our first subcontract on a City project within 4 months."',
    attribution: 'MBE-Certified Subcontractor, St. Louis',
  },
  cta: {
    title: 'Ready to Win Your First Government Contract?',
    text: 'Let\'s review your business, identify the right certifications and bid opportunities, and build your path to your first government check. First assessment is free.',
    button: 'Book a Free Bid Readiness Call',
    link: '/property-transfer',
  },
  relatedPages: [
    { title: 'MWBE Certification St. Louis', path: '/st-louis/mwbe-certification-assistance', desc: 'Get SLDC MBE/WBE certified for St. Louis city contracts.' },
    { title: 'DBE Certification Missouri', path: '/dbe-certification-missouri', desc: 'MODOT DBE, ACDBE, and Metro/Bi-State DBE certification assistance.' },
    { title: 'MBE Certification Missouri', path: '/mbe-certification-missouri', desc: 'State-level MO OEO MBE/WBE for Missouri state agency contracts.' },
    { title: 'Start a CDS Agency', path: '/start-a-cds-agency-missouri', desc: 'Complete startup guide for Missouri CDS agencies — DSDS, EVV, and compliance from day one.' },
  ],
};

const GovernmentContractingStLouis: React.FC = () => {
  return (
    <>
      <SeoHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        canonicalPath="/government-contracting-consultant-st-louis"
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />

      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content="Government Contracting Consulting St. Louis" />
        <meta itemProp="provider" content="THE REAL HELP, LLC" />
        <meta itemProp="areaServed" content="St. Louis, Missouri" />

        <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0a0a1a] via-[#0d0d24] to-[#0a0a1a] overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#c0a36b]/10 text-[#c0a36b] border border-[#c0a36b]/20 mb-6">
                  {pageData.hero.eyebrow}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                  {pageData.hero.title}
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                  {pageData.hero.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to={pageData.hero.ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0a36b] text-black font-semibold rounded-lg hover:bg-[#a68b4b] transition-colors"
                  >
                    {pageData.hero.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/st-louis/mwbe-certification-assistance"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#c0a36b]/30 text-[#c0a36b] font-semibold rounded-lg hover:bg-[#c0a36b]/10 transition-colors"
                  >
                    Start MWBE Certification
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* What We Do */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
              What a Government Contracting Consultant Does for Your Business
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Public agencies in St. Louis — the City, SLDC, MODOT, Metro, MSD, St. Louis County, Missouri state agencies,
              and federal departments — spend billions annually on goods and services. They are legally required to allocate
              portions of that spend to certified minority-owned, women-owned, and disadvantaged businesses. The contracts
              exist. The problem is most small businesses cannot navigate the bureaucracy to access them.
            </p>
          </FadeIn>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.services.map((svc, i) => (
              <div key={i} className="bg-[#0d0d24] border border-gray-800 rounded-xl p-6 hover:border-[#c0a36b]/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[#c0a36b]/10 flex items-center justify-center mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{svc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* The Bid Process */}
      <section className="py-20 bg-[#0d0d24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              {pageData.howItWorks.title}
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 gap-8">
            {pageData.howItWorks.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-[#0a0a1a] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c0a36b] text-black flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Prime vs Sub */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
              {pageData.primeVsSub.title}
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {pageData.primeVsSub.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#0d0d24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <blockquote className="text-xl sm:text-2xl text-gray-300 italic leading-relaxed mb-6">
              {pageData.socialProof.quote}
            </blockquote>
            <cite className="text-[#c0a36b] text-sm not-italic font-medium">
              — {pageData.socialProof.attribution}
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {pageData.cta.title}
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{pageData.cta.text}</p>
            <Link
              to={pageData.cta.link}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0a36b] text-black font-semibold rounded-lg hover:bg-[#a68b4b] transition-colors"
            >
              {pageData.cta.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-20 bg-[#0d0d24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white text-center mb-10">Related Services</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.relatedPages.map((page, i) => (
              <Link
                key={i}
                to={page.path}
                className="block p-6 bg-[#0a0a1a] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors group"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#c0a36b] transition-colors">
                  {page.title}
                </h3>
                <p className="text-gray-400 text-sm">{page.desc}</p>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* SEO Content Footer */}
      <section className="py-16 bg-[#0a0a1a] border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-xl font-semibold text-white mb-4">Government Contracting Consulting in St. Louis</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-3">
              <p>
                THE REAL HELP, LLC provides end-to-end government contracting consulting for small businesses in St. Louis, Missouri.
                We guide you through certification (SLDC MBE/WBE, MO OEO MBE/WBE, MODOT DBE, SBA 8(a)), procurement portal registration
                (SAM.gov, MissouriBUYS, B2GNow), bid preparation, and post-award compliance. Our clients include construction
                subcontractors, professional services firms, trucking companies, IT consultants, and suppliers seeking to win
                government contracts at the city, state, and federal levels.
              </p>
              <p>
                The government procurement process is complex by design — multiple portals, strict compliance requirements,
                and unwritten rules about how to position your firm. We provide the expertise and hands-on support to navigate
                every stage, from determining which certifications apply to your business through submitting compliant bids
                and maintaining post-award reporting.
              </p>
              <p>
                Serving St. Louis City, St. Louis County, St. Charles, and the broader Missouri region. Remote consultation
                available for firms targeting federal contracts.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default GovernmentContractingStLouis;