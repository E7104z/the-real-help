import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function WebAppDevelopmentStLouis() {
  return (
    <>
      <Helmet>
        <title>Web App Development St. Louis | The Real Help, LLC</title>
        <meta
          name="description"
          content="Affordable web app development in St. Louis. Custom portals, scheduling tools, client dashboards, and full-stack applications built fast by The Real Help, LLC."
        />
        <link rel="canonical" href="https://therealhelp.com/web-app-development-st-louis" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web App Development St. Louis",
          "provider": { "@type": "LocalBusiness", "name": "The Real Help, LLC", "address": { "@type": "PostalAddress", "addressLocality": "St. Louis", "addressRegion": "MO" } },
          "areaServed": "St. Louis, MO",
          "description": "Custom web application development for St. Louis businesses — portals, dashboards, scheduling tools, and full-stack applications."
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-brand-blue-50 px-4 py-1.5 text-sm font-semibold text-brand-blue-500 mb-6">
            Low Competition · St. Louis
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight">
            Web App Development St. Louis
          </h1>
          <p className="mt-6 text-xl text-brand-silver-500 leading-relaxed max-w-3xl">
            Most St. Louis businesses that need a web application get quotes for $50,000+ and a 6-month timeline. The Real
            Help, LLC builds full-stack web applications in weeks, not months — at a price that makes sense for small and
            mid-size businesses. Real applications built for real business problems.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              Discuss Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            What We Build for St. Louis Businesses
          </h2>
          <p className="text-lg text-brand-silver-500 mb-8 leading-relaxed">
            The Real Help, LLC specializes in practical business applications — the kind that solve a specific workflow problem,
            integrate with your existing tools, and are built to be maintained without a development team on retainer.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Client and staff portals',
              'Scheduling and workforce management tools',
              'Internal operations dashboards',
              'Document management and approval workflows',
              'Compliance tracking systems',
              'CRM and pipeline tools',
              'API integrations and data connectors',
              'Mobile-responsive web applications',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle className="h-5 w-5 text-brand-blue-500 mt-0.5 shrink-0" />
                <span className="text-brand-silver-500 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            How We Build — Fast and Reliable
          </h2>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            Every application is built with React, TypeScript, and Firebase — a stack that is fast to deploy, easy to scale,
            and inexpensive to run. No proprietary platforms that lock you in. No bloated frameworks that require a full-time
            engineer to maintain. You get clean code that you own.
          </p>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            We build in sprints. Most initial versions of a business application are delivered in 2 to 4 weeks. From there,
            we iterate based on your feedback until the application matches your business process exactly.
          </p>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            The Real Help, LLC has built scheduling applications for CDS agencies, compliance tracking systems for Medicaid
            providers, and certification platforms for minority-owned businesses in Missouri. Every project starts with a
            clear scope and a realistic timeline — not a sales pitch.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-500 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Need a Web Application Built in St. Louis?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Describe what you need. We will tell you if we can build it, how long it takes, and what it costs. No pressure.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-blue-500 shadow-sm hover:bg-blue-50 transition-colors"
          >
            Start the Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
