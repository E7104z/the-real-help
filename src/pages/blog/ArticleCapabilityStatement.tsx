import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ArticleCapabilityStatement() {
  return (
    <>
      <Helmet>
        <title>Your Capability Statement Is Costing You Contracts. Here Is Why. | The Real Help, LLC</title>
        <meta
          name="description"
          content="A weak capability statement disqualifies you before anyone reads your proposal. Here is what government buyers actually look for and how to build a statement that works."
        />
        <link rel="canonical" href="https://therealhelp.com/insights/capability-statement-guide" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Your Capability Statement Is Costing You Contracts. Here Is Why.",
          "author": { "@type": "Person", "name": "Jason Griffin" },
          "publisher": { "@type": "Organization", "name": "The Real Help, LLC" },
          "datePublished": "2026-03-10",
          "description": "A weak capability statement disqualifies you before anyone reads your proposal. Here is what government buyers actually look for and how to fix it."
        })}</script>
      </Helmet>

      <article className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-500 hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>

          <span className="inline-block rounded-full bg-brand-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue-500 mb-4">
            Government Contracting
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-black sm:text-5xl leading-tight mb-6">
            Your Capability Statement Is Costing You Contracts. Here Is Why.
          </h1>
          <p className="text-brand-silver-500 text-sm mb-8">By Jason Griffin · 4 min read</p>

          <div className="prose prose-lg max-w-none text-brand-silver-500 space-y-6">
            <p>
              Most small businesses pursuing government contracts have a capability statement. Most of those capability
              statements are not doing their job. They are either too vague to be useful, too long to be read, or missing
              the specific information that procurement officers actually need.
            </p>
            <p>
              A capability statement is not a brochure. It is not a resume. It is a one-page sales document designed to
              answer one question: <em>Can this business do what we need, and are they qualified?</em> If your statement
              does not answer that question clearly and quickly, it gets set aside — usually before anyone reads your proposal.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              What a Capability Statement Is Actually For
            </h2>
            <p>
              When a government buyer or prime contractor is evaluating vendors, they are not reading carefully at first.
              They are scanning. Your capability statement has about 15 seconds to establish three things:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>What does this company do, specifically?</li>
              <li>Are they certified or registered appropriately?</li>
              <li>Have they done this kind of work before?</li>
            </ol>
            <p>
              If those three things are not immediately obvious, you are out — regardless of how qualified you actually are.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              The 6 Most Common Capability Statement Mistakes
            </h2>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">1. Generic Core Competencies</h3>
            <p>
              "We provide quality consulting services to meet your business needs" means nothing. Core competencies need
              to be specific, action-oriented, and tied to what the buyer actually buys. Compare:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Weak:</strong> Business consulting and project management services</li>
              <li><strong>Strong:</strong> CDS agency setup, EVV compliance alignment, Medicaid billing process documentation</li>
            </ul>
            <p>
              Specificity is what separates you from the 50 other businesses that submitted a statement that week.
            </p>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">2. Missing or Buried NAICS Codes</h3>
            <p>
              NAICS codes are how government systems categorize and search for vendors. If your codes are not prominently
              listed — or if you listed the wrong ones — you will not come up in the right searches. Your capability statement
              should list your primary NAICS code near the top, with secondary codes clearly labeled.
            </p>
            <p>
              Many business owners choose codes that are too broad or accidentally use codes from adjacent industries. This
              matters because contract set-asides are tied to specific NAICS codes. Wrong code means wrong opportunities.
            </p>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">3. No Past Performance</h3>
            <p>
              Past performance is not optional. It is the section that buyers trust the most. You do not need government
              contract history — private sector work, community projects, and internal work all count for early-stage
              businesses. What matters is that you show you have done something similar for someone.
            </p>
            <p>
              If you have no past performance at all, lead with a project description that demonstrates capability — even
              if unpaid or self-initiated. A blank past performance section signals inexperience and raises red flags.
            </p>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">4. Poor Visual Hierarchy</h3>
            <p>
              A wall of text in 10pt font does not get read. A capability statement should be one page, with clear section
              headers, your logo prominently placed, and the most critical information (certifications, NAICS codes, contact
              info) easy to find at a glance. If someone has to search for your phone number, the design is failing you.
            </p>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">5. Missing SAM.gov Registration</h3>
            <p>
              If you are pursuing federal contracts and are not registered in SAM.gov, include it in your capability
              statement only when registration is active. If you are not registered, get registered — it is free and
              required for any federal award. Your CAGE code and UEI number should be visible on the statement.
            </p>

            <h3 className="font-heading text-xl font-bold text-brand-black mt-8">6. Wrong Differentiators</h3>
            <p>
              "Family-owned since 1998" and "commitment to excellence" are not differentiators in government contracting.
              What matters: your certifications (MBE, WBE, DBE, HUBZone, SDVOSB, etc.), your geographic coverage, your
              response time, your specific technical qualifications, and any unique positioning that relates to what the
              buyer actually cares about.
            </p>
            <p>
              Lead with what makes you eligible and qualified, not with what makes you feel good about your company.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              What a Strong Capability Statement Looks Like
            </h2>
            <p>
              A strong capability statement fits on one page and answers every important question without the reader
              having to look hard. In order of importance:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li><strong>Company name, logo, and a one-line description</strong> of exactly what you do</li>
              <li><strong>Core competencies</strong> — 4–6 specific, action-oriented bullets</li>
              <li><strong>Certifications and registrations</strong> — MBE, WBE, DBE, SAM.gov UEI, CAGE code</li>
              <li><strong>NAICS codes</strong> — primary and secondary, clearly labeled</li>
              <li><strong>Past performance</strong> — 2–3 relevant engagements with client names (or descriptions if confidential)</li>
              <li><strong>Contact information</strong> — name, phone, email, website</li>
            </ol>
            <p>
              That is it. One page. Clean layout. Specific language. Every section earns its space.
            </p>

            <h2 className="font-heading text-2xl font-bold text-brand-black mt-10">
              The Bottom Line
            </h2>
            <p>
              A capability statement is often the first thing a government buyer or prime contractor sees. If it is generic,
              cluttered, or incomplete, it signals that your business may operate the same way. A clean, specific,
              well-structured statement signals professionalism before you ever speak to anyone.
            </p>
            <p>
              Getting it right is not complicated — but it does require knowing what buyers actually look for. That is
              not intuitive if you have not been on the evaluation side of the table.
            </p>
          </div>

          <div className="mt-16 rounded-2xl bg-brand-blue-500 p-8 text-white text-center">
            <p className="font-heading text-xl font-bold">Need a Capability Statement That Actually Works?</p>
            <p className="mt-2 text-blue-100 text-sm">I build and review capability statements for St. Louis businesses. Let's make sure yours is positioning you correctly.</p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-brand-blue-500 hover:bg-brand-silver-50 transition-colors"
            >
              Let's Talk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
