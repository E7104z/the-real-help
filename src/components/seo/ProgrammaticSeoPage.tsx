import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Clock, AlertTriangle } from 'lucide-react';
import { FadeIn, StaggerChildren } from '../animation';
import SeoHead from './SeoHead';
import StructuredData from './StructuredData';

export interface ProgrammaticPageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  faqItems: {
    question: string;
    answer: string;
  }[];
  sections: {
    title: string;
    icon?: 'check' | 'file' | 'clock' | 'alert';
    items: {
      heading: string;
      text: string;
    }[];
  }[];
  cta: {
    title: string;
    text: string;
    button: string;
  };
  relatedPages: {
    title: string;
    path: string;
    desc: string;
  }[];
}

const iconMap: Record<string, React.ReactNode> = {
  check: <CheckCircle className="w-5 h-5 text-[#c0a36b]" />,
  file: <FileText className="w-5 h-5 text-[#c0a36b]" />,
  clock: <Clock className="w-5 h-5 text-[#c0a36b]" />,
  alert: <AlertTriangle className="w-5 h-5 text-[#c0a36b]" />,
};

function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

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
  sameAs: [
    'https://linkedin.com/company/the-real-help',
    'https://facebook.com/TheRealHelpLLC',
  ],
};

const ProgrammaticSeoPage: React.FC<{ data: ProgrammaticPageData }> = ({ data }) => {
  const faqSchema = buildFaqSchema(data.faqItems);

  return (
    <>
      <SeoHead
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        canonicalPath={`/${data.slug}`}
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={localBusinessSchema} />

      {/* Schema.org Service microdata */}
      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content={data.seo.title} />
        <meta itemProp="provider" content="THE REAL HELP, LLC" />
        <meta itemProp="areaServed" content="Missouri" />

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0a0a1a] via-[#0d0d24] to-[#0a0a1a] overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#c0a36b]/10 text-[#c0a36b] border border-[#c0a36b]/20 mb-6">
                  {data.hero.eyebrow}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                  {data.hero.title}
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                  {data.hero.subtitle}
                </p>
                <Link
                  to="/property-transfer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0a36b] text-black font-semibold rounded-lg hover:bg-[#a68b4b] transition-colors"
                >
                  {data.cta.button}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* Content Sections */}
      {data.sections.map((section, si) => (
        <section
          key={si}
          className={`py-20 ${si % 2 === 0 ? 'bg-[#0a0a1a]' : 'bg-[#0d0d24]'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
                {section.title}
              </h2>
            </FadeIn>
            <StaggerChildren className="grid md:grid-cols-2 gap-8">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className="flex gap-4 p-6 bg-[#0d0d24] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors"
                >
                  {section.icon && iconMap[section.icon] && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c0a36b]/10 flex items-center justify-center">
                      {iconMap[section.icon]}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.heading}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      {data.faqItems.length > 0 && (
        <section className="py-20 bg-[#0d0d24]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <StaggerChildren className="space-y-4">
              {data.faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-[#0a0a1a] border border-gray-800 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-medium hover:text-[#c0a36b] transition-colors">
                    {faq.question}
                    <span className="text-[#c0a36b] text-lg ml-4 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {data.cta.title}
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{data.cta.text}</p>
            <Link
              to="/property-transfer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c0a36b] text-black font-semibold rounded-lg hover:bg-[#a68b4b] transition-colors"
            >
              {data.cta.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Related Pages */}
      {data.relatedPages.length > 0 && (
        <section className="py-20 bg-[#0d0d24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-bold text-white text-center mb-10">
                Related Resources
              </h2>
            </FadeIn>
            <StaggerChildren className="grid md:grid-cols-3 gap-6">
              {data.relatedPages.map((page, i) => (
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
      )}

      {/* SEO Content Footer */}
      <section className="py-16 bg-[#0a0a1a] border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-xl font-semibold text-white mb-4">
              {data.seo.title}
            </h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-3">
              <p>
                THE REAL HELP, LLC provides expert consulting for small businesses across Missouri.
                Based in St. Louis, we specialize in government contracting, MWBE/DBE certification,
                CDS agency compliance, and business operations automation. {data.seo.description}
              </p>
              <p>
                Serving St. Louis City, St. Louis County, St. Charles, and the broader Missouri region.
                Remote consultation available for out-of-state firms.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default ProgrammaticSeoPage;