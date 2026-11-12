import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerChildren } from '../../components/animation';
import StructuredData from '../../components/seo/StructuredData';
import SeoHead from '../../components/seo/SeoHead';

const seoContent = {
  title: 'DBE Certification Missouri | MODOT, ACDBE & Metro DBE Consultant',
  description:
    'Expert DBE certification assistance in Missouri. MODOT DBE, ACDBE (airport), and Metro/Bi-State DBE certification. Personal net worth, social disadvantage narrative, and document preparation from someone who knows the process.',
  keywords: [
    'DBE certification Missouri',
    'MODOT DBE certification',
    'ACDBE certification Missouri',
    'Metro Bi-State DBE',
    'disadvantaged business enterprise Missouri',
    'DBE consultant St. Louis',
    'personal net worth DBE',
    'social disadvantage narrative DBE',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is DBE certification and how is it different from MBE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DBE (Disadvantaged Business Enterprise) is a federal certification administered through state DOTs for firms bidding on USDOT-funded transportation contracts — highways, bridges, transit, and airports. Unlike MBE (which is city- or state-specific), DBE has a strict personal net worth cap of $1.32 million, requires a social disadvantage narrative, and includes a rigorous on-site review. In Missouri, MODOT administers DBE certification. Getting DBE-certified opens the door to billions in federally-funded infrastructure work where prime contractors have mandatory DBE participation goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the personal net worth limit for DBE certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The personal net worth (PNW) limit for DBE certification is $1.32 million, adjusted annually for inflation. The calculation excludes your primary residence and ownership interest in the applicant firm, but includes everything else — cash, investments, retirement accounts, vehicles, and other real estate. Going over the PNW cap is an automatic disqualification with no waiver. We help you calculate your PNW correctly before you apply, and structure assets when possible to stay under the cap. Many applicants get denied because they miscalculate what counts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does MODOT DBE certification take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MODOT DBE certification typically takes 3–6 months from application submission to decision. The process includes: document review, a site visit by a certification analyst, interviews with the owner(s), and verification of social disadvantage. The single biggest timeline risk is incomplete documentation — missing tax returns, inconsistent ownership records, or an inadequate social disadvantage narrative. We front-load all of this so your application moves through review without the back-and-forth that adds months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a social disadvantage narrative for DBE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the social disadvantage narrative is one of the most scrutinized parts of the DBE application. You must provide a written personal account of specific incidents of discrimination or disadvantage you have experienced, backed by objective evidence where possible (news articles, demographic data, witness statements). The narrative must be detailed, specific to you personally, and demonstrate how disadvantage has affected your entry into or advancement in the business world. This is not just a form — it is evaluated for credibility and sufficiency. We help you draft a narrative that meets the legal standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is ACDBE certification and who needs it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ACDBE (Airport Concession DBE) is a separate certification for firms providing concessions — food, retail, rental cars, advertising — at airports. Lambert St. Louis International Airport has FAA-mandated ACDBE participation goals. The certification process is similar to DBE but has different ownership and control requirements specific to concession businesses. If you want to operate a concession at Lambert, you need ACDBE certification, not just DBE.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DBE Certification Missouri — MODOT, ACDBE & Metro DBE',
  provider: {
    '@type': 'LocalBusiness',
    name: 'THE REAL HELP, LLC',
    address: { '@type': 'PostalAddress', addressLocality: 'St. Louis', addressRegion: 'MO', addressCountry: 'US' },
  },
  areaServed: { '@type': 'State', name: 'Missouri' },
  description:
    'Expert DBE certification assistance for Missouri businesses — MODOT DBE, ACDBE, and Metro/Bi-State DBE with personal net worth calculation and social disadvantage narrative help.',
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
    eyebrow: 'Federal DBE · MODOT · ACDBE · Metro',
    title: 'DBE Certification Missouri',
    subtitle:
      'MODOT DBE. ACDBE for Lambert Airport. Metro/Bi-State DBE for transit contracts. One application mistake can cost you months and a denial with no clear path to fix it. We prepare your entire DBE package — PNW, social disadvantage narrative, site readiness — before you submit.',
    cta: 'Get a Free DBE Readiness Review',
    ctaLink: '/property-transfer',
  },
  problem: {
    title: 'DBE Denial Is Common. Here Is Why.',
    points: [
      {
        heading: 'PNW Over the Cap',
        text: 'The $1.32M personal net worth cap is strict. Many applicants miscalculate because they do not know what to include (retirement accounts count; your house does not). We calculate your PNW correctly before you apply.',
      },
      {
        heading: 'Weak Social Disadvantage Narrative',
        text: 'A vague, two-paragraph statement gets rejected. The narrative must be detailed, personal, and backed by evidence. We help you draft one that meets the legal standard and withstands analyst scrutiny.',
      },
      {
        heading: 'Inconsistent Ownership Documents',
        text: 'Your tax returns, operating agreement, bank signatures, and lease must all tell the same story about who owns and controls the business. Inconsistency is the fastest path to denial. We cross-check everything.',
      },
      {
        heading: 'Failed Site Visit',
        text: 'The on-site review is real — a certification analyst comes to your location, interviews you, and verifies your operation physically exists. We prepare you and your site for what they look for.',
      },
    ],
  },
  howItWorks: {
    title: 'How We Get You DBE Certified',
    steps: [
      {
        step: '1',
        title: 'PNW Calculation & Eligibility Check',
        text: 'We calculate your personal net worth per 49 CFR Part 26, verify you meet the social and economic disadvantage criteria, and identify any eligibility issues before you invest time in the application.',
      },
      {
        step: '2',
        title: 'Document Assembly',
        text: 'Three years of tax returns (personal and business), PNW statement, ownership and control documentation, management profiles, equipment lists, and lease/deed. Organized exactly how MODOT or the certifying agency expects.',
      },
      {
        step: '3',
        title: 'Social Disadvantage Narrative',
        text: 'We guide you through writing your narrative — specific incidents, objective evidence, and the legal framework the reviewer will apply. This is not a form letter; it is your personal story told in a way that satisfies 49 CFR Part 26.',
      },
      {
        step: '4',
        title: 'Application Submission & Follow-Up',
        text: 'We submit through MODOT\'s B2GNow portal (or Metro\'s system), track status, respond to analyst questions, and prepare you for the site visit. We stay engaged until you receive your certification letter.',
      },
    ],
  },
  socialProof: {
    quote:
      '"We applied for MODOT DBE twice and got denied both times — once on PNW, once on the narrative. THE REAL HELP rewrote our narrative, recalculated our PNW correctly, and we were certified in 4 months. We have already won $380K in subcontracts."',
    attribution: 'DBE-Certified Supplier, St. Louis Metro',
  },
  cta: {
    title: 'Is Your DBE Application Ready?',
    text: 'Most denials are preventable. Let us review your eligibility, PNW, and documents before you submit. Free 15-minute assessment.',
    button: 'Get Your DBE Readiness Review',
    link: '/property-transfer',
  },
  relatedPages: [
    { title: 'MBE Certification Missouri', path: '/mbe-certification-missouri', desc: 'State-level MO OEO MBE/WBE certification for Missouri state agency contracts.' },
    { title: 'MWBE Certification St. Louis', path: '/st-louis/mwbe-certification-assistance', desc: 'SLDC MBE/WBE certification for City of St. Louis contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract bid support and procurement strategy.' },
  ],
};

const DbeCertificationMissouri: React.FC = () => {
  return (
    <>
      <SeoHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        canonicalPath="/dbe-certification-missouri"
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />

      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content="DBE Certification Missouri — MODOT, ACDBE & Metro DBE" />
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
          <StaggerChildren className="grid md:grid-cols-2 gap-8">
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
            <h2 className="text-xl font-semibold text-white mb-4">DBE Certification in Missouri</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-3">
              <p>
                THE REAL HELP, LLC provides specialized DBE (Disadvantaged Business Enterprise) certification assistance for 
                Missouri businesses seeking MODOT DBE certification, ACDBE certification for Lambert Airport concessions, and 
                Metro/Bi-State DBE certification for transit projects. DBE certification is a federal program administered at 
                the state level for USDOT-funded transportation contracts with mandatory DBE participation goals.
              </p>
              <p>
                The DBE application process is the most rigorous of all small business certifications. It requires a detailed 
                personal net worth calculation (cap: $1.32M), a compelling social disadvantage narrative, three years of tax 
                returns, and an on-site review. We handle every component — PNW calculation, narrative drafting, document 
                assembly, application submission through B2GNow, and site visit preparation.
              </p>
              <p>
                Based in St. Louis, serving businesses throughout Missouri including Kansas City, Columbia, Springfield, Jefferson City, 
                and rural Missouri. Remote consultation available for out-of-state firms needing Missouri DBE certification.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default DbeCertificationMissouri;