import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { FadeIn, StaggerChildren } from '../../components/animation';
import StructuredData from '../../components/seo/StructuredData';
import SeoHead from '../../components/seo/SeoHead';

const seoContent = {
  title: 'Start a CDS Agency in Missouri | DSDS, DMH & EVV Startup Guide',
  description:
    'Complete step-by-step guide to starting a Consumer Directed Services (CDS) agency in Missouri. Business formation, MO HealthNet enrollment, DSDS/DMH contracting, EVV setup, FUSION training, and startup budget. Launch a compliant, Medicaid-billable CDS agency.',
  keywords: [
    'start a CDS agency Missouri',
    'CDS agency startup',
    'CDS agency Missouri',
    'Consumer Directed Services Missouri',
    'DSDS provider enrollment',
    'MO HealthNet CDS',
    'start home care agency Missouri',
    'CDS compliance Missouri',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I start a CDS agency in Missouri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Starting a Consumer Directed Services (CDS) agency in Missouri involves several steps: (1) Form your business entity with the Missouri Secretary of State — typically an LLC. (2) Obtain an EIN from the IRS. (3) Develop your agency\'s policies and procedures manual compliant with DSDS and DMH regulations. (4) Secure a business location that meets DSDS requirements. (5) Apply for your MO HealthNet provider number through MO HealthNet. (6) Contract with DSDS and/or DMH to provide CDS services. (7) Set up your payroll system, EVV (Electronic Visit Verification) system, and attendant management infrastructure. (8) Hire and train program managers and attendants. The full process from formation to serving your first consumer typically takes 3–6 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the startup costs for a Missouri CDS agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Startup costs for a Missouri CDS agency typically range from $10,000 to $30,000, depending on your approach. Major cost categories include: business formation and legal fees ($1,000–$3,000), policies and procedures development ($2,000–$5,000 if outsourced), office space and setup ($2,000–$5,000), insurance including professional liability and workers\' compensation ($3,000–$6,000 annually), EVV system setup and first-year subscription ($1,000–$3,000), payroll system setup ($500–$1,500), and working capital to cover payroll before Medicaid reimbursements begin ($5,000–$10,000). The biggest variable is whether you hire consultants for policies, compliance, and enrollment — doing it yourself saves money but costs time and carries higher compliance risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between DSDS and DMH CDS programs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DSDS (Department of Social Services, Division of Senior and Disability Services) and DMH (Department of Mental Health) run separate CDS programs in Missouri. DSDS CDS serves elderly and physically disabled consumers through MO HealthNet waivers. DMH CDS serves consumers with mental health conditions and developmental disabilities. Key differences: DSDS requires FUSION care plan documentation; DMH has its own care plan system. DSDS billing goes through MO HealthNet directly; DMH billing may go through an administrative agent. Attendant training requirements differ. Many CDS agencies serve both populations, but you need separate contracts with DSDS and DMH — each with its own application, policies requirements, and compliance audits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need EVV for my CDS agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Electronic Visit Verification (EVV) is mandatory for all Missouri CDS agencies providing personal care services under Medicaid, per the federal 21st Century Cures Act. Missouri uses the AuthentiCare EVV system, managed by HHAeXchange. EVV must capture: date of service, location of service delivery, individual providing the service, type of service, and time the service begins and ends. CDS attendants clock in and out via a mobile app or telephone system. Your agency must ensure attendants are trained on EVV, EVV data is verified before billing, and discrepancies are resolved promptly. Non-compliance results in claim denials and potential repayment obligations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long until my CDS agency can start billing and generating revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The timeline from formation to first billable hour is typically 3–6 months. Months 1–2: business formation, EIN, policies and procedures development. Month 3: MO HealthNet provider enrollment (this alone can take 45–60 days). Month 4: DSDS/DMH contracting, EVV system setup, hiring. Months 5–6: first consumer intake, FUSION care plan authorization, attendant matching, and first billing cycle. After that, reimbursement typically arrives 15–30 days after claim submission. We accelerate this timeline by handling the provider enrollment, policy development, and compliance setup in parallel — our clients typically reach first billing in 3–4 months.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Start a CDS Agency in Missouri',
  provider: {
    '@type': 'LocalBusiness',
    name: 'THE REAL HELP, LLC',
    address: { '@type': 'PostalAddress', addressLocality: 'St. Louis', addressRegion: 'MO', addressCountry: 'US' },
  },
  areaServed: { '@type': 'State', name: 'Missouri' },
  description:
    'Complete startup assistance for Missouri CDS agencies — business formation, DSDS/DMH contracting, EVV setup, FUSION care plan training, and ongoing compliance support.',
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

const pageData = {
  hero: {
    eyebrow: 'Startup Guide · High Intent',
    title: 'Start a CDS Agency in Missouri',
    subtitle:
      'Everything you need to launch a compliant, Medicaid-billable CDS agency. Business formation, DSDS/DMH contracting, EVV setup, FUSION training, and policies — we handle the administrative side so you can focus on care.',
    cta: 'Get Your CDS Startup Roadmap',
    ctaLink: '/property-transfer',
  },
  overview: {
    title: 'What You\'re Building: A Missouri CDS Agency in 2026',
    description:
      'A CDS (Consumer Directed Services) agency is a Medicaid-enrolled provider that enables consumers to hire and manage their own personal care attendants. Your agency handles the administrative infrastructure — payroll, tax withholding, EVV compliance, DSDS/DMH billing, and attendant oversight — while the consumer directs their own care. It\'s a high-demand, recession-resistant business model because Medicaid enrollment grows every year and CDS is the preferred care model for consumers who want control over who enters their home.',
    stats: [
      { label: 'MO CDS Consumers', value: '35,000+' },
      { label: 'Startup Timeline', value: '3–6 Months' },
      { label: 'Startup Cost', value: '$10K–$30K' },
      { label: 'Reimbursement', value: '~$22/hr' },
      { label: 'DSDS/DMH Contracts', value: 'Dual Eligible' },
      { label: 'EVV Required', value: 'Mandatory' },
    ],
  },
  checklist: {
    title: 'CDS Agency Startup Checklist: Every Step in Order',
    description: 'Miss a step and your MO HealthNet provider enrollment resets. Follow this checklist exactly — or let us manage it for you.',
    items: [
      {
        title: 'Business Formation',
        desc: 'Form an LLC with the Missouri Secretary of State. Obtain EIN from IRS. Open a dedicated business bank account. Register with Missouri Department of Revenue for withholding tax.',
      },
      {
        title: 'Policies & Procedures',
        desc: 'Develop DSDS-compliant policies manual covering: consumer intake and assessment, attendant hiring/qualification/training, EVV protocols, billing procedures, complaint resolution, emergency protocols, and consumer rights. DSDS reviews this manual as part of your provider enrollment.',
      },
      {
        title: 'MO HealthNet Provider Enrollment',
        desc: 'Submit the MO HealthNet provider enrollment application with all supporting documents: business license, EIN confirmation, policies manual, proof of insurance, and designated program manager qualifications. This step takes 45–60 days — submit a complete package to avoid resets.',
      },
      {
        title: 'DSDS & DMH Contracting',
        desc: 'Once your MO HealthNet provider number is issued, execute provider agreements with DSDS (Division of Senior and Disability Services) and/or DMH (Department of Mental Health). Each contract has specific service definitions, billing codes, and compliance requirements.',
      },
      {
        title: 'EVV System Setup',
        desc: 'Register with HHAeXchange for AuthentiCare EVV access. Configure attendant profiles, consumer profiles, and service schedules. Train your team on clock-in/clock-out procedures, exception handling, and EVV-to-billing reconciliation.',
      },
      {
        title: 'Payroll & Attendant Infrastructure',
        desc: 'Set up payroll system for attendant wages, tax withholding, and quarterly reporting. Establish attendant hiring procedures: background checks, E-Verify, abuse registry checks, and orientation. Create consumer intake forms matching FUSION care plan data fields.',
      },
      {
        title: 'First Consumer Intake',
        desc: 'Receive consumer referral from DSDS/DMH case manager. Complete intake assessment. Verify care plan authorization in FUSION. Match and assign attendant. Begin EVV-monitored service delivery. Submit first claim.',
      },
      {
        title: 'Ongoing Compliance',
        desc: 'Monthly: EVV audit and billing reconciliation. Quarterly: payroll tax filings. Annually: policy review, DSDS renewal, insurance renewal. Continuously: stay current on DSDS INFO memos and DMH policy bulletins.',
      },
    ],
  },
  mistakes: {
    title: '5 Mistakes That Kill New CDS Agencies',
    items: [
      { title: 'Underfunding Payroll Float', desc: 'Medicaid reimbursements arrive 15–30 days after claims submission, but attendants must be paid weekly or biweekly. Agencies that don\'t plan for a 4–6 week payroll float run out of cash before their first reimbursement clears.' },
      { title: 'DIY Policies That Don\'t Pass DSDS Review', desc: 'Generic policies downloaded from the internet get rejected in provider enrollment review. DSDS expects specific language on consumer rights, emergency protocols, and EVV compliance. We\'ve seen agencies delayed 2+ months over policy rewrite requests.' },
      { title: 'Hiring Attendants Before Provider Enrollment', desc: 'You can\'t bill for attendant services until your MO HealthNet provider number is active. Hiring attendants too early burns working capital with no revenue. Align your hiring timeline with your approved provider date.' },
      { title: 'Ignoring EVV Until After Launch', desc: 'EVV setup takes 2–4 weeks — provider registration, system configuration, staff training. Agencies that treat EVV as a "launch week" task find themselves unable to bill for services they\'ve already delivered because EVV data isn\'t capturing correctly.' },
      { title: 'Missing FUSION Authorization Changes', desc: 'FUSION care plans are updated when the consumer\'s needs change. Billing against an outdated care plan — even by one hour — creates an overpayment and repayment demand. DSDS expects agencies to verify authorization before every claim.' },
    ],
  },
  costs: {
    title: 'Realistic Startup Budget',
    note: 'Ranges reflect DIY vs. consultant-assisted approaches. We accelerate each step and reduce compliance risk.',
    items: [
      { item: 'LLC Formation + EIN', low: 100, high: 800 },
      { item: 'Policies & Procedures Manual', low: 500, high: 5000 },
      { item: 'Insurance (Liability + Workers Comp)', low: 3000, high: 6000 },
      { item: 'MO HealthNet Enrollment Support', low: 0, high: 3500 },
      { item: 'EVV System Setup (first year)', low: 1000, high: 3000 },
      { item: 'Payroll System Setup', low: 500, high: 1500 },
      { item: 'Office Setup (if not home-based)', low: 500, high: 5000 },
      { item: 'Working Capital (payroll float)', low: 5000, high: 10000 },
    ],
  },
  cta: {
    title: 'Launch Your CDS Agency With a Team That\'s Done This Before',
    text: 'Get a custom CDS startup roadmap — timeline, budget, document checklist, and compliance plan tailored to your goals. Free 30-minute consultation.',
    button: 'Get Your CDS Startup Plan',
    link: '/property-transfer',
  },
  relatedPages: [
    { title: 'CDS Compliance & EVV Consulting', path: '/missouri/cds-compliance-consulting', desc: 'Ongoing DSDS, DMH, EVV, and FUSION compliance support for established CDS agencies.' },
    { title: 'CDS & EVV Compliance Blog', path: '/blog/cds-evv-compliance-missouri', desc: 'Deep dive into EVV requirements, FUSION workflows, and DSDS policy updates.' },
    { title: 'Business Consultant St. Louis', path: '/st-louis/business-consultant', desc: 'Workflow automation and operational systems for your CDS agency.' },
  ],
};

const StartCdsAgencyMissouri: React.FC = () => {
  return (
    <>
      <SeoHead
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        canonicalPath="/start-a-cds-agency-missouri"
      />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />

      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="name" content="Start a CDS Agency in Missouri" />
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

      {/* Overview */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
              {pageData.overview.title}
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {pageData.overview.description}
            </p>
          </FadeIn>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.overview.stats.map((stat, i) => (
              <div key={i} className="bg-[#0d0d24] border border-gray-800 rounded-xl p-6 hover:border-[#c0a36b]/30 transition-colors">
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="text-lg font-semibold text-white">{stat.value}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Startup Checklist */}
      <section className="py-20 bg-[#0d0d24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {pageData.checklist.title}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {pageData.checklist.description}
            </p>
          </FadeIn>
          <StaggerChildren className="space-y-4">
            {pageData.checklist.items.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#0a0a1a] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c0a36b] text-black flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Startup Mistakes */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {pageData.mistakes.title}
            </h2>
          </FadeIn>
          <StaggerChildren className="space-y-6">
            {pageData.mistakes.items.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#0d0d24] border border-gray-800 rounded-xl hover:border-[#c0a36b]/30 transition-colors">
                <AlertTriangle className="h-6 w-6 text-red-400 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Startup Costs Table */}
      <section className="py-20 bg-[#0d0d24]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {pageData.costs.title}
            </h2>
            <p className="text-gray-400 mb-8 text-sm">{pageData.costs.note}</p>
          </FadeIn>
          <div className="bg-[#0a0a1a] border border-gray-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-800 bg-[#0d0d24] text-sm font-semibold text-white">
              <div>Item</div>
              <div className="text-right">DIY</div>
              <div className="text-right">With Consultant</div>
            </div>
            {pageData.costs.items.map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 p-4 border-b border-gray-800 last:border-0 text-sm">
                <div className="text-gray-300">{row.item}</div>
                <div className="text-right text-gray-400">${row.low.toLocaleString()}</div>
                <div className="text-right text-gray-400">${row.high.toLocaleString()}</div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#c0a36b]/5 text-sm font-semibold">
              <div className="text-[#c0a36b]">Total</div>
              <div className="text-right text-[#c0a36b]">$10,600</div>
              <div className="text-right text-[#c0a36b]">$34,800</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <blockquote className="text-xl sm:text-2xl text-gray-300 italic leading-relaxed mb-6">
              "I tried starting my CDS agency alone and got stuck on the provider enrollment for 3 months. THE REAL HELP took over, rewrote my policies, handled the DSDS submission, and got me approved in 6 weeks. I served my first consumer at month 4."
            </blockquote>
            <cite className="text-[#c0a36b] text-sm not-italic font-medium">
              — CDS Agency Founder, St. Louis Metro
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
            <h2 className="text-xl font-semibold text-white mb-4">Starting a CDS Agency in Missouri</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 space-y-3">
              <p>
                THE REAL HELP, LLC provides complete startup assistance for entrepreneurs launching Consumer Directed
                Services (CDS) agencies in Missouri. From business formation through your first Medicaid
                reimbursement, we handle the administrative, compliance, and operational setup so you can
                focus on building the care team that will serve Missouri consumers.
              </p>
              <p>
                Our CDS startup package includes: business formation guidance, DSDS-compliant policies and
                procedures manual development, MO HealthNet provider enrollment management, DSDS/DMH
                contract execution, EVV (AuthentiCare/HHAeXchange) system setup, FUSION care plan training,
                payroll infrastructure, and ongoing compliance monitoring. We also offer CDS Scheduler Pro —
                our custom software platform for attendant scheduling, EVV reconciliation, and billing
                management.
              </p>
              <p>
                Based in St. Louis and serving entrepreneurs statewide. Whether you\'re in Kansas City,
                Columbia, Springfield, or rural Missouri, we provide remote and on-site startup support
                to get your CDS agency operational and compliant.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default StartCdsAgencyMissouri;