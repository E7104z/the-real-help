import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ArticleCdsEvvCompliance() {
  return (
    <>
      <Helmet>
        <title>CDS EVV Compliance in Missouri: What Changed in 2026 | The Real Help, LLC</title>
        <meta
          name="description"
          content="What Missouri CDS agencies need to know about EVV compliance in 2026. Updated requirements, common billing errors, and how to build a system that survives audits."
        />
        <link rel="canonical" href="https://therealhelp.com/insights/cds-evv-compliance-missouri-2026" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "CDS EVV Compliance in Missouri: What Changed in 2026",
          "author": { "@type": "Person", "name": "Jason Griffin" },
          "publisher": { "@type": "Organization", "name": "The Real Help, LLC" },
          "datePublished": "2026-01-22",
          "description": "Missouri CDS agency EVV compliance in 2026 — updated requirements, common billing errors, and operational systems that prevent audit findings."
        })}</script>
      </Helmet>

      <article className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-500 hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>

          <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue-500 mb-4">
            Medicaid / CDS
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight mb-6">
            CDS EVV Compliance in Missouri: What Changed in 2026
          </h1>
          <p className="text-brand-silver-500 text-sm mb-8">By Jason Griffin · 10 min read</p>

          <div className="prose prose-lg max-w-none text-brand-silver-500 space-y-6">
            <p>
              Electronic Visit Verification has been mandatory for Medicaid personal care services in Missouri for several
              years. But 2026 brought tighter enforcement, updated documentation requirements, and expanded audit activity
              from MO HealthNet — and many Consumer-Directed Services agencies are not prepared. This article covers what
              actually changed, what it means for your billing, and what you need to have in place before your next audit.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              Quick Background on EVV in Missouri
            </h2>
            <p>
              EVV is the federal mandate (21st Century CURES Act) requiring all Medicaid personal care and home health
              agencies to electronically verify every service visit. In Missouri, MO HealthNet has required EVV compliance
              for CDS services since 2021. Every visit must capture the type of service, the individual receiving service,
              the date and time of service, the location, and the identity of the caregiver providing the service.
            </p>
            <p>
              CDS agencies use a state-approved EVV system — either the state's free aggregator system or an approved
              alternative vendor. The EVV records are matched against your billing claims. Mismatches result in denials.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              What Missouri Updated in 2026
            </h2>
            <p>
              The primary changes affecting CDS agencies in 2026 include:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Real-time EVV matching enforcement.</strong> MO HealthNet has tightened the timeline for EVV
                records to match billing claims. Claims submitted without a corresponding verified EVV record within the
                required window are automatically denied — not pended.
              </li>
              <li>
                <strong>Location data validation.</strong> EVV records with GPS location data that falls outside the
                approved service location will now flag for review. Agencies with participants who receive services at
                non-fixed locations need updated service location records.
              </li>
              <li>
                <strong>Caregiver identity verification.</strong> Phone-based EVV verification (caller ID) is being phased
                out as a primary verification method for new agreements. Mobile app-based verification with biometric
                confirmation is now preferred.
              </li>
              <li>
                <strong>Authorization alignment.</strong> Claims are now being cross-checked against current
                authorizations more aggressively. Billing for services after authorization expiration — even by one day
                — results in denial with recoupment risk.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              The Most Common EVV Billing Errors for Missouri CDS Agencies
            </h2>
            <p>
              These are the patterns we see over and over in agencies that are struggling with EVV compliance:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Visit data not syncing to the state aggregator.</strong> Caregivers clock in and out on an EVV
                app, but the records are not being properly transmitted to the state. This creates a clean-looking internal
                record with no match in the state system — instant denial.
              </li>
              <li>
                <strong>Manual overrides without documentation.</strong> When caregivers forget to clock in or out,
                agencies manually adjust the visit record. This is allowed — but it requires a written supervisor approval
                and reason documented in the system. Undocumented overrides are audit findings.
              </li>
              <li>
                <strong>Billing before EVV confirmation.</strong> Some billing systems allow claims to go out before EVV
                is verified. With tighter enforcement in 2026, this is now a reliable way to create mass denials.
              </li>
              <li>
                <strong>Authorization gaps.</strong> A participant's authorization expired, gets renewed two weeks later,
                and services continued throughout. The two weeks of services in between are now a recoupment liability.
              </li>
            </ol>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              What Your Agency Needs to Have in Place
            </h2>
            <p>
              Surviving a MO HealthNet audit in 2026 requires more than just an EVV system. You need a workflow that
              connects your EVV records, your billing submissions, your authorizations, and your caregiver documentation
              at every step. Specifically:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A pre-billing reconciliation process that matches every claim to a verified EVV record before submission</li>
              <li>An authorization tracking system that flags upcoming expirations at least two weeks in advance</li>
              <li>A documented policy for manual EVV overrides including supervisor approval workflows</li>
              <li>Regular EVV data audits — at least monthly — comparing internal records to state system records</li>
              <li>Up-to-date participant service location records for all non-fixed service locations</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              Building a Compliance System, Not Just a Compliance Policy
            </h2>
            <p>
              The agencies that pass audits without crisis are not the ones with the best intentions — they are the ones
              with systems that produce compliant documentation automatically. When the auditor asks for records, they can
              produce them in hours instead of days. When billing goes out, it has already been reconciled against EVV data.
              When authorizations approach expiration, someone is already working on the renewal.
            </p>
            <p>
              That level of operational discipline is buildable. It requires workflow design, the right tools, and initial
              setup investment. The Real Help, LLC has built exactly these systems for CDS agencies in Missouri, and the
              difference in audit outcomes is dramatic.
            </p>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-600 transition-colors"
            >
              Review Your EVV Compliance <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
