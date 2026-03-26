import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function CdsComplianceMissouri() {
  return (
    <>
      <Helmet>
        <title>CDS EVV Compliance Missouri | The Real Help, LLC</title>
        <meta
          name="description"
          content="Missouri CDS agency compliance consulting. EVV alignment, billing reconciliation, audit prep, and documentation systems for Consumer-Directed Services providers."
        />
        <link rel="canonical" href="https://therealhelp.com/cds-compliance-missouri" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "CDS EVV Compliance Missouri",
          "provider": { "@type": "LocalBusiness", "name": "The Real Help, LLC", "address": { "@type": "PostalAddress", "addressLocality": "St. Louis", "addressRegion": "MO" } },
          "areaServed": "Missouri",
          "description": "CDS agency compliance, EVV system alignment, and Medicaid audit preparation in Missouri."
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-brand-blue-50 px-4 py-1.5 text-sm font-semibold text-brand-blue-500 mb-6">
            Nearly Zero Competition · High Intent
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight">
            CDS Compliance Missouri
          </h1>
          <p className="mt-6 text-xl text-brand-silver-500 leading-relaxed max-w-3xl">
            Missouri's Consumer-Directed Services (CDS) program has strict EVV requirements, billing standards, and audit
            protocols. If your agency is struggling to keep up, you are not alone — but falling behind creates real financial
            and legal risk. We help CDS agencies build systems that stay compliant automatically.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              Talk to a CDS Expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* EVV Background */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
            What Is CDS EVV Compliance in Missouri?
          </h2>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            Electronic Visit Verification (EVV) is now federally mandated for all Medicaid personal care and home health
            services. In Missouri, the Department of Social Services (DSS) and MO HealthNet require CDS agencies to use
            approved EVV systems that capture the date, time, location, and caregiver identity for every visit.
          </p>
          <p className="text-lg text-brand-silver-500 mb-6 leading-relaxed">
            For Consumer-Directed Services agencies specifically, this means aligning your EVV records with your billing
            submissions, participant plans, and caregiver agreements — in real time. Mismatches between EVV data and billing
            claims are the leading cause of claim denials and audit findings for Missouri CDS providers.
          </p>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            Beyond EVV, CDS compliance in Missouri includes proper authorization tracking, caregiver documentation, participant
            plan alignment, and annual reassessment processes. Agencies that stay ahead of these requirements avoid the
            costly cycle of audits, repayments, and provider terminations.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-black mb-8">
            How We Help Missouri CDS Agencies
          </h2>
          <ul className="space-y-4 mb-8">
            {[
              'EVV system audit — identify gaps between recorded visits and billing claims',
              'Billing reconciliation workflow — match EVV records to claims before submission',
              'Documentation system setup — caregiver files, authorizations, and participant plans',
              'Staff training on EVV data entry and compliance requirements',
              'Audit preparation — organize records and build response protocols',
              'Operational SOP creation for scheduling, documentation, and billing',
              'Technology integration — connect your EVV system with your billing workflow',
              'Ongoing compliance monitoring and quarterly reviews',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-blue-500 mt-0.5 shrink-0" />
                <span className="text-brand-silver-500">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-brand-silver-500 leading-relaxed">
            The Real Help, LLC has worked directly with CDS agencies in Missouri, building the workflows and documentation
            systems that turn compliance from a crisis into a routine. We have seen what auditors look for, and we build
            systems that produce that evidence automatically.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-500 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Is Your Missouri CDS Agency EVV Compliant?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's run through your current documentation and find out. Free initial review, no obligation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-blue-500 shadow-sm hover:bg-blue-50 transition-colors"
          >
            Request a Free Review <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
