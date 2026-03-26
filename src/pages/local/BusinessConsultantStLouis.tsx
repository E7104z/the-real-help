import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function BusinessConsultantStLouis() {
  return (
    <>
      <Helmet>
        <title>Business Consultant St. Louis | The Real Help, LLC</title>
        <meta
          name="description"
          content="Looking for a business consultant in St. Louis? The Real Help, LLC delivers real results in compliance, operations, tech, and growth. No fluff, no retainers."
        />
        <link rel="canonical" href="https://therealhelp.com/business-consultant-st-louis" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Business Consulting St. Louis",
          "provider": { "@type": "LocalBusiness", "name": "The Real Help, LLC", "address": { "@type": "PostalAddress", "addressLocality": "St. Louis", "addressRegion": "MO" } },
          "areaServed": "St. Louis, MO",
          "description": "Business consulting services in St. Louis covering compliance, operations, technology, and growth strategy."
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-brand-blue-50 px-4 py-1.5 text-sm font-semibold text-brand-blue-500 mb-6">
            St. Louis, Missouri
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight">
            Business Consultant St. Louis
          </h1>
          <p className="mt-6 text-xl text-brand-silver-500 leading-relaxed max-w-3xl">
            Most business consultants in St. Louis charge retainer fees to tell you what you already know. The Real Help, LLC is
            different — we get in, fix the problem, and hand it back to you running.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              Book a Free Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            What a St. Louis Business Consultant Actually Does
          </h2>
          <p className="text-lg text-brand-silver-500 mb-8 leading-relaxed">
            A business consultant helps you solve the problems that are stopping your business from growing. In St. Louis, those
            problems tend to be the same ones over and over: your operations are disorganized, your technology is outdated, your
            compliance is a liability, or your team is doing work that should be automated. We fix all of that.
          </p>
          <p className="text-lg text-brand-silver-500 mb-8 leading-relaxed">
            Jason Griffin, founder of The Real Help, LLC, has spent years inside city government, Medicaid systems, CDS agencies,
            and tech startups. He brings that experience directly to small and mid-size businesses in the St. Louis metropolitan
            area — from the city itself to St. Charles, Chesterfield, Clayton, and beyond.
          </p>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            Unlike large consulting firms, you work directly with Jason. No junior consultants. No account managers buffering
            your communication. The person you call is the person doing the work.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-8">
            Business Consulting Services in St. Louis
          </h2>
          <ul className="space-y-4">
            {[
              'MWBE / MBE / WBE certification strategy and application support',
              'Medicaid and CDS compliance consulting',
              'Business operations assessment and documentation',
              'Google Workspace setup and systems integration',
              'Custom web app and portal development',
              'AI-powered workflow automation',
              'Government contracting readiness',
              'Branding, positioning, and go-to-market strategy',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-blue-500 mt-0.5 shrink-0" />
                <span className="text-brand-silver-500">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why St. Louis */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            Why Work With a Local St. Louis Consultant?
          </h2>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            St. Louis has its own ecosystem — its own certifying agencies, contracting networks, Medicaid structures, and economic
            development programs. A consultant who knows those systems from the inside is worth more than one who learns it from
            a website.
          </p>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            The Real Help, LLC has worked with St. Louis-based CDS agencies, minority-owned businesses pursuing MWBE
            certification, and startups building technology for the local market. We know the landscape, and we know how to move
            through it efficiently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-500 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Talk to a St. Louis Business Consultant?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            No pitch. No pressure. Just a direct conversation about what you need and whether we can help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-blue-500 shadow-sm hover:bg-blue-50 transition-colors"
          >
            Book a Free Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
