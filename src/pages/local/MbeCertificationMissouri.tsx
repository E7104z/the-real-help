import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerChildren } from '../../components/animation';
import StructuredData from '../../components/seo/StructuredData';
import SeoHead from '../../components/seo/SeoHead';

const seoContent = {
  title: 'MBE Certification Missouri | MO OEO MBE/WBE State Certification Help',
  description:
    'Get MBE/WBE certified with the Missouri Office of Equal Opportunity (MO OEO). State-level certification for Missouri state agency contracts. Document preparation, application assistance, and certification maintenance.',
  keywords: [
    'MBE certification Missouri',
    'MO OEO MBE certification',
    'Missouri WBE certification',
    'state MBE certification Missouri',
    'Missouri Office of Equal Opportunity',
    'MBE WBE Missouri state contracts',
    'minority business certification MO',
    'women business enterprise Missouri',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Missouri OEO MBE/WBE certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Missouri Office of Equal Opportunity (MO OEO) administers the state-level MBE (Minority Business Enterprise) and WBE (Women Business Enterprise) certification program. This certification qualifies your firm for Missouri state agency contracts with MBE/WBE participation goals. It is separate from the City of St. Louis SLDC certification and the federal MODOT DBE certification — each unlocks different sets of contracts. MO OEO certification applies to all Missouri state executive branch agencies and many state-funded projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is MO OEO MBE different from SLDC MBE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MO OEO MBE is state-level certification for Missouri state agency contracts (MoDOT, DNR, OA, etc.). SLDC MBE is city-level certification for City of St. Louis contracts only. The certifications are administered by different agencies with different forms, different document requirements, and different definitions of what qualifies as an eligible MBE. They do NOT automatically reciprocate — you need each certification separately. However, the document package overlaps significantly, so we typically prepare both simultaneously, saving you time and duplicate effort.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for MO OEO MBE certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The MO OEO MBE certification requires: a completed application form, proof of minority or women ownership (51% or more), U.S. citizenship or permanent residency documentation, 3 years of business tax returns, 3 years of personal tax returns for each owner, a personal financial statement, business formation documents (articles of incorporation/organization), operating agreement or bylaws, proof of management and control by the qualifying owner(s), lease or deed for business premises, and documentation of any business licenses. Missing or inconsistent documents are the number one cause of denial.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does MO OEO certification take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MO OEO MBE/WBE certification typically takes 60–90 days from submission of a complete application. Incomplete applications can take significantly longer. The OEO reviews your ownership structure, management control, and financial documentation to verify that the business is truly minority- or women-owned and controlled. We front-load all document preparation so your application is complete on first submission — this eliminates the back-and-forth that adds weeks or months to the timeline.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MBE Certification Missouri — MO OEO State Certification',
  provider: {
    '@type': 'LocalBusiness',
    name: 'THE REAL HELP, LLC',
    address: { '@type': 'PostalAddress', addressLocality: 'St. Louis', addressRegion: 'MO', addressCountry: 'US' },
  },
  areaServed: { '@type': 'State', name: 'Missouri' },
  description:
    'Missouri OEO MBE/WBE certification assistance — document preparation, application support, and certification strategy for Missouri state agency contracts.',
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
  areaServed: { '@type': 'State', name: 'Missouri' },
  sameAs: ['https://linkedin.com/company/the-real-help', 'https://facebook.com/TheRealHelpLLC'],
};

const pageData = {
  hero: {
    eyebrow: 'MO OEO · State-Level Certification',
    title: 'MBE Certification Missouri',
    subtitle:
      'Missouri Office of Equal Opportunity (MO OEO) MBE/WBE certification for state agency contracts. Separate from SLDC. Separate from MODOT DBE. We handle the documents, the portal, and the process — you get certified.',
    cta: 'Check Your MO OEO Eligibility',
    ctaLink: '/property-transfer',
  },
  problem: {
    title: 'State Certification Is a Separate Process',
    points: [
      {
        heading: 'Different Agency, Different Rules',
        text: 'MO OEO certification has its own forms, definitions, and document standards. SLDC certification does NOT automatically transfer to the state level. We know both systems and prepare your package for each.',
      },
      {
        heading: 'Ownership & Control Scrutiny',
        text: 'The OEO evaluates whether minority/women owners genuinely control the business — not just hold 51% on paper. Management structure, board composition, and operating authority all matter. We review these before you apply.',
      },
      {
        heading: 'Document Gaps Between City and State',
        text: 'Even if you are SLDC-certified, the state requires additional or differently formatted documents. Missing the state-specific requirements resets your review timeline. We know the differences and address them upfront.',
      },
    ],
  },
  howItWorks: {
    title: 'How We Get You MO OEO Certified',
    steps: [
      {
        step: '1',
        title: 'Eligibility Assessment',
        text: 'We verify your ownership structure, control, and eligibility for state-level MBE or WBE certification. If you are also pursuing SLDC or DBE, we plan the sequence to minimize duplicate effort.',
      },
      {
        step: '2',
        title: 'Document Preparation',
        text: 'We assemble the complete MO OEO document package — formation documents, tax returns, ownership schedules, management profiles, and financial statements — formatted to state requirements.',
      },
      {
        step: '3',
        title: 'Application Submission',
        text: 'We submit through the MO OEO portal, track your application status, and respond to reviewer questions. We handle the administrative follow-through so you stay focused on your business.',
      },
      {
        step: '4',
        title: 'Renewal & Maintenance',
        text: 'MO OEO certification requires periodic renewal. We manage your renewal calendar, update documentation, and ensure your certification never lapses.',
      },
    ],
  },
  socialProof: {
    quote:
      '"We had our SLDC MBE but kept losing state bids because we did not have MO OEO certification. THE REAL HELP got us state-certified in 55 days, and we won our first state contract two months later."',
    attribution: 'MBE-Certified Business, Kansas City',
  },
  cta: {
    title: 'Need both city and state MBE certification?',
    text: 'We prepare both simultaneously — shared document review, separate applications, one coordinated timeline. Free 15-minute assessment to map your certification path.',
    button: 'Get Your Certification Roadmap',
    link: '/property-transfer',
  },
  relatedPages: [
    { title: 'DBE Certification Missouri', path: '/dbe-certification-missouri', desc: 'MODOT DBE, ACDBE, and Metro/Bi-State DBE certification for federal transportation contracts.' },
    { title: 'MWBE Certification St. Louis', path: '/st-louis/mwbe-certification-assistance', desc: 'SLDC MBE/WBE certification for City of St. Louis contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract bid support and procurement strategy.' },
  ],
};

const MbeCertificationMissouri: React.FC = () => {
  return (
    <>
      <SeoHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        canonicalPath="/mbe-certification-missouri"
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />

      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content="MBE Certification Missouri — MO OEO State Certification" />
        <meta itemProp="provider" content="THE REAL HELP, LLC" />
        <meta itemProp="areaServed" content="Missouri" />

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
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                  {pageData.hero.subtitle}
                </p>
                <Link
                  to={pageData.hero.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0a36b] text-black font-semibold rounded-lg hover:bg-[#a68b4b] transition-colors"
                >
                  {pageData.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* The Problem Section */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              {pageData.problem.title}
            </h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {pageData.problem.points.map((point, i) => (
              <div key={i} className="bg-[#0d0d24] border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{point.heading}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{point.text}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works */}
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

      {/* Social Proof */}
      <section className="py-20 bg-[#0a0a1a]">
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
      <section className="py-20 bg-[#0d0d24]">
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
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white text-center mb-10">Related Services</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-6">
            {pageData.relatedPages.map((page, i) => (
              <Link
                key={i}
                to={page.path}
                className="block p-6 bg-[#0d0d24] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors group"
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
            <h2 className="text-xl font-semibold text-white mb-4">MBE Certification in Missouri</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-3">
              <p>
                THE REAL HELP, LLC provides end-to-end MBE/WBE certification assistance for Missouri businesses seeking 
                state-level certification through the Missouri Office of Equal Opportunity (MO OEO). MO OEO certification 
                qualifies your firm for Missouri state agency contracts with MBE/WBE participation goals — separate and 
                distinct from City of St. Louis SLDC certification or federal MODOT DBE certification.
              </p>
              <p>
                We manage the complete MO OEO application process: eligibility assessment, document assembly (formation 
                documents, tax returns, ownership schedules, management profiles, financial statements), application 
                submission through the OEO portal, reviewer correspondence, and certification renewal. For firms pursuing 
                multiple certifications, we coordinate the process to maximize document reuse and minimize duplicate effort.
              </p>
              <p>
                Serving businesses throughout Missouri including St. Louis, Kansas City, Columbia, Springfield, Jefferson City, 
                and all rural communities. Remote consultation available.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default MbeCertificationMissouri;