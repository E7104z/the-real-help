import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { CardVisual } from '@/components/illustrations/CardVisual';

const ARTICLES = [
  {
    slug: 'mwbe-certification-st-louis-guide',
    href: '/blog/mwbe-certification-guide-st-louis',
    category: 'Certification',
    title: 'How to Get MWBE Certified in St. Louis (2026 Complete Guide)',
    excerpt: 'Most denials come down to documentation gaps, ownership structure issues, or pass-through red flags. Here is what to watch for before you submit.',
    readTime: '12 min read',
    featured: true,
  },
  {
    slug: 'cds-evv-compliance-missouri-2026',
    href: '/blog/cds-evv-compliance-missouri',
    category: 'Medicaid / CDS',
    title: 'CDS EVV Compliance in Missouri: What Changed in 2026',
    excerpt: 'Electronic Visit Verification is not going away. Here is how to align your operations so audits are not a crisis.',
    readTime: '10 min read',
    featured: false,
  },
  {
    slug: 'affordable-web-app-development-st-louis',
    href: '/blog/web-app-development-st-louis',
    category: 'App Development',
    title: 'Affordable Web App Development for Small Businesses in St. Louis',
    excerpt: 'Most St. Louis businesses overpay for development or never get started. Here is what a realistic project looks like and how to scope it right.',
    readTime: '9 min read',
    featured: false,
  },
  {
    slug: 'google-workspace-small-business',
    href: '/blog/google-workspace-automation',
    category: 'Business Systems',
    title: 'How Google Workspace Can Replace 5 Tools You Are Currently Paying For',
    excerpt: 'Most small businesses are overpaying for disconnected tools. Here is how to consolidate and actually use what you have.',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'capability-statement-guide',
    href: '/blog/capability-statement-guide',
    category: 'Government Contracting',
    title: 'Your Capability Statement Is Costing You Contracts. Here Is Why.',
    excerpt: 'A weak capability statement is one of the fastest ways to disqualify yourself before anyone reads your proposal.',
    readTime: '4 min read',
    featured: false,
  },
  {
    slug: 'medicaid-billing-errors',
    href: '/blog/medicaid-billing-errors',
    category: 'Medicaid / CDS',
    title: 'Why Medicaid Claims Get Denied and What You Can Do About It Today',
    excerpt: 'Billing denials are almost always preventable. Here are the most common errors and how to eliminate them from your process.',
    readTime: '6 min read',
    featured: false,
  },
];

export default function InsightsPage() {
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div>
      <Helmet>
        <title>Business Insights & Resources St. Louis | The Real Help, LLC</title>
        <meta name="description" content="Practical guides on MWBE certification, Medicaid CDS compliance, web app development, and business automation — written by a St. Louis business consultant." />
        <link rel="canonical" href="https://therealhelp.com/insights" />
      </Helmet>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl">Insights</h1>
            <p className="mt-4 text-lg text-brand-silver-500 max-w-2xl mx-auto">
              Practical knowledge from someone who has been inside the systems.
            </p>
          </div>

          {featured && (
            <div className="mb-12 rounded-2xl border border-brand-blue-200 bg-brand-blue-50 overflow-hidden">
              <CardVisual category={featured.category} height="11rem" />
              <div className="p-8 md:p-12">
              <span className="inline-block rounded-full bg-brand-blue-500 px-3 py-1 text-xs font-semibold text-white mb-4">
                Featured · {featured.category}
              </span>
              <h2 className="font-heading text-2xl font-bold text-brand-black sm:text-3xl max-w-3xl">{featured.title}</h2>
              <p className="mt-4 text-brand-silver-500 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="inline-flex items-center gap-1 text-xs text-brand-silver-400">
                  <Clock className="h-3 w-3" /> {featured.readTime}
                </span>
                <Link to={featured.href ?? '/contact'} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-500 hover:underline">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <div key={article.slug} className="rounded-2xl border border-brand-silver-200 bg-white overflow-hidden hover:shadow-soft transition-all">
                <CardVisual category={article.category} />
                <div className="p-6">
                <span className="inline-block rounded-full bg-brand-silver-100 px-3 py-1 text-xs font-semibold text-brand-silver-600 mb-3">
                  {article.category}
                </span>
                <h2 className="font-heading text-lg font-bold text-brand-black leading-snug">{article.title}</h2>
                <p className="mt-3 text-sm text-brand-silver-500 leading-relaxed">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-brand-silver-400">
                    <Clock className="h-3 w-3" /> {article.readTime}
                  </span>
                  {article.href && (
                    <Link to={article.href} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue-500 hover:underline">
                      Read more <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
