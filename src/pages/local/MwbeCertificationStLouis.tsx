import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function MwbeCertificationStLouis() {
  return (
    <>
      <Helmet>
        <title>MWBE Certification St. Louis | The Real Help, LLC</title>
        <meta
          name="description"
          content="Get MWBE certified in St. Louis with expert guidance. The Real Help, LLC handles MBE, WBE, and DBE certification applications from start to approval."
        />
        <link rel="canonical" href="https://therealhelp.com/mwbe-certification-st-louis" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "MWBE Certification Consulting St. Louis",
          "provider": { "@type": "LocalBusiness", "name": "The Real Help, LLC", "address": { "@type": "PostalAddress", "addressLocality": "St. Louis", "addressRegion": "MO" } },
          "areaServed": "St. Louis, MO",
          "description": "MWBE, MBE, WBE, and DBE certification consulting for St. Louis businesses."
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-brand-blue-50 px-4 py-1.5 text-sm font-semibold text-brand-blue-500 mb-6">
            Low Competition · High Intent
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight">
            MWBE Certification St. Louis
          </h1>
          <p className="mt-6 text-xl text-brand-silver-500 leading-relaxed max-w-3xl">
            MWBE certification opens doors to government contracts, supplier diversity programs, and economic development
            opportunities in St. Louis and Missouri. Most applications fail because of documentation problems — not eligibility.
            We fix that.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              Start Your Certification <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What Is MWBE */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            What Is MWBE Certification in Missouri?
          </h2>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            MWBE stands for Minority and Women-Owned Business Enterprise. In Missouri and St. Louis specifically, MWBE
            certification is issued through agencies like the St. Louis Development Corporation (SLDC), the State of Missouri
            Office of Equal Opportunity, and through federal programs like the SBA 8(a) and DBE programs.
          </p>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            Certification gives your business official recognition as a minority or women-owned enterprise, which can qualify
            you for set-aside contracts, city and state procurement opportunities, and corporate supplier diversity programs in
            the St. Louis metro area.
          </p>
          <p className="text-lg text.brand-silver-500 leading-relaxed">
            The certifications most St. Louis businesses pursue include: MBE (Minority Business Enterprise), WBE (Women-Owned
            Business Enterprise), DBE (Disadvantaged Business Enterprise), and SBE (Small Business Enterprise). Many programs
            require separate applications to multiple agencies.
          </p>
        </div>
      </section>

      {/* What We Handle */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-8">
            What The Real Help, LLC Handles for You
          </h2>
          <ul className="space-y-4 mb-8">
            {[
              'Determine which certifications you qualify for and which to pursue first',
              'Review business structure, ownership documentation, and operating history',
              'Identify and close documentation gaps before submission',
              'Prepare the full application package including narratives and affidavits',
              'Submit and follow through with the certifying agency',
              'Handle follow-up questions and requests for additional documentation',
              'Prepare for site visits and interviews where required',
              'Strategy for maintaining certification and pursuing renewals',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-blue-500 mt-0.5 shrink-0" />
                <span className="text-brand-silver-500">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            Most MWBE applications in St. Louis are rejected the first time due to gaps in ownership documentation, pass-through
            concerns, or incomplete narratives. We review everything before it goes in so you are not losing months to a
            correctable denial.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-500 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Get MWBE Certified in St. Louis?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's review your eligibility, identify the right certifications, and build a plan. First call is free.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-blue-500 shadow-sm hover:bg-blue-50 transition-colors"
          >
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
