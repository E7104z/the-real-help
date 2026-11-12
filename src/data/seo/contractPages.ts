import type { ProgrammaticPageData } from '../../components/seo/ProgrammaticSeoPage';

// ── Set B: "Win the Contract" Pages (≈8 pages) ────────────────────────────────────
// How to bid as an MBE supplier vs. subcontractor, what CUF means, BABAA compliance,
// how B2GNow works, reading an MHDC bid package, prevailing wage basics,
// insurance requirements on GC bids, how primes evaluate MBE participation.

export const mbeSupplierVsSubcontractor: ProgrammaticPageData = {
  slug: 'contracts/mbe-supplier-vs-subcontractor',
  seo: {
    title: 'MBE Supplier vs. Subcontractor | Bid Strategy for Government Contracts',
    description:
      'Should you bid as an MBE prime supplier or subcontractor? The strategic choice that determines your revenue, risk, and growth path on Missouri government contracts. How primes evaluate MBEs and when to make the jump to prime.',
    keywords: ['MBE supplier vs subcontractor', 'MBE prime contractor', 'MBE subcontracting strategy', 'government contract bidding strategy', 'prime vs sub MBE', 'how primes evaluate MBE'],
  },
  hero: {
    eyebrow: 'Bid Strategy',
    title: 'MBE Supplier vs. Subcontractor: The Decision That Shapes Your Business',
    subtitle:
      'Most St. Louis small businesses make more money as subcontractors to large primes — especially when starting out. But bidding as a prime on smaller set-asides can be highly profitable. Here is how to make the right call for each opportunity, every time.',
  },
  faqItems: [
    {
      question: 'Should I bid as a prime contractor or a subcontractor?',
      answer:
        'For most small businesses in St. Louis, subcontracting to established primes is the right starting point. Primes carry the bonding, insurance, and performance risk. As a sub, your job is to deliver your scope on time and on budget. The cash flow is faster because primes typically pay within 30 days, while government payment cycles can stretch to 45–60 days. However, bidding as a prime on smaller set-aside contracts (under $150K) can be highly profitable if you have the certifications, bonding capacity, and operational infrastructure. We analyze your financials, bonding, insurance, and staffing to recommend the right position for each specific opportunity.',
    },
    {
      question: 'How do prime contractors evaluate MBE subcontractors?',
      answer:
        'Primes evaluate MBE subcontractors on five criteria: (1) Certification validity — is your MBE/WBE/DBE certification current, in the right jurisdiction, and applicable to the contract\'s diversity goals? (2) Capacity — can you actually perform the scope of work on the project timeline? (3) Price competitiveness — your price must fit within the prime\'s overall bid while still being profitable for you. (4) Past performance — have you successfully completed similar work, preferably on government projects? (5) Compliance infrastructure — do you have certified payroll, insurance, safety programs, and reporting systems in place? The primes aren\'t doing you a favor — they need you to meet their MBE goal, and they will choose the sub that makes their bid strongest.',
    },
    {
      question: 'When does it make sense to bid as a prime?',
      answer:
        'Bidding as a prime makes sense when: (1) the contract value is under $250K and within your bonding capacity; (2) you have the operational capacity to manage subcontractors and handle all administrative reporting; (3) you have at least 6–12 months of working capital to cover the payment lag between invoicing and government payment; (4) the contract is a set-aside specifically for your certification category (MBE, WBE, DBE, 8(a), SDVOSB, etc.); and (5) you have built relationships with reliable subcontractors who can cover scopes outside your core competency. Primeship is a growth decision, not an ego decision — it requires infrastructure that most small firms underinvest in.',
    },
    {
      question: 'How do I market my MBE certification to prime contractors?',
      answer:
        'Marketing your MBE certification to primes starts before the RFP drops. Build relationships with primes\' diversity/supplier-diversity managers. Attend pre-bid conferences and introduce yourself with a capability statement in hand. Register in prime contractor supplier portals. Follow up after meetings with a one-page summary of your certification, NAICS codes, past performance, and bonding capacity. When an RFP is released, contact the primes you know are bidding and offer your scope and pricing early — primes lock in their subs before finalizing their bid. Primes need you to meet their participation goal; make it easy for them to choose you by presenting a complete, compliant, priced scope package.',
    },
  ],
  sections: [
    {
      title: 'Prime vs. Sub: A Decision Framework',
      icon: 'file',
      items: [
        { heading: 'Revenue Potential', text: 'As a prime: you keep 100% of the contract value but carry all performance risk. As a sub: you get your scope payment without the administrative burden. A $500K contract as a prime might net $75K–$100K after subcontractor and overhead costs. A $150K subcontract might net $45K–$60K with far less risk. The right answer depends on your margins, not just the top-line number.' },
        { heading: 'Cash Flow', text: 'Primes: government payment cycles run 30–60 days after invoicing, and retainage (5–10%) is held until project completion. You need substantial working capital. Subs: primes typically pay within 30 days, often faster if you negotiate progress payments. Better cash flow for smaller firms.' },
        { heading: 'Bonding', text: 'Primes: you need bid bonds, performance bonds, and payment bonds — typically 100% of the contract value. Getting bonded as a small business is difficult and expensive. Subs: primes carry the bonding; you may need no bonding at all, depending on the prime\'s requirements.' },
        { heading: 'Administrative Burden', text: 'Primes: certified payroll reports, MBE utilization tracking, progress reports, change order management, safety compliance, subcontractor management. These consume 15–25% of your contract revenue in overhead. Subs: you handle your scope\'s paperwork, which is typically manageable for firms with fewer than 20 employees.' },
        { heading: 'Growth Trajectory', text: 'Sub first, prime later is the proven path. Build your track record, bonding capacity, and working capital as a sub on 3–5 contracts. Then pursue a small set-aside as a prime. Each successful prime contract builds your past performance for the next, larger opportunity.' },
      ],
    },
  ],
  cta: {
    title: 'Get a Bid-Positioning Analysis',
    text: 'We will review your certifications, financials, and capacity and tell you which contracts to pursue as a prime and which as a sub. Free 15-minute assessment.',
    button: 'Get Your Bid Strategy',
  },
  relatedPages: [
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract bidding and procurement navigation.' },
    { title: 'How B2GNow Works', path: '/contracts/how-b2gnow-works', desc: 'Step-by-step guide to the B2GNow procurement portal used by SLDC and MODOT.' },
    { title: 'MBE Participation: What Primes Look For', path: '/contracts/how-primes-evaluate-mbe', desc: 'How prime contractors evaluate and select MBE subcontractors on government projects.' },
  ],
};

export const howB2gnowWorks: ProgrammaticPageData = {
  slug: 'contracts/how-b2gnow-works',
  seo: {
    title: 'How B2GNow Works | SLDC & MODOT Vendor Portal Guide',
    description:
      'Complete guide to the B2GNow procurement portal used by SLDC and MODOT for vendor registration, certification management, bid submissions, and compliance reporting in Missouri.',
    keywords: ['B2GNow guide', 'B2GNow vendor portal', 'SLDC B2GNow', 'MODOT B2GNow', 'how to use B2GNow', 'B2GNow registration', 'B2GNow bid submission'],
  },
  hero: {
    eyebrow: 'Procurement Portal',
    title: 'How B2GNow Works for Missouri Vendors',
    subtitle:
      'B2GNow is the procurement and compliance platform used by the City of St. Louis (SLDC) and MODOT. If you want city or state transportation contracts, you have to operate in B2GNow. Here is your complete guide — registration, certification upload, bid search, and compliance reporting.',
  },
  faqItems: [
    {
      question: 'What is B2GNow and why do I need it?',
      answer:
        'B2GNow is a supplier diversity and procurement compliance platform used by government agencies to manage vendor registration, certification verification, bid solicitation, and contract compliance. In Missouri, both SLDC (City of St. Louis) and MODOT (Missouri Department of Transportation) use B2GNow. SLDC uses it for MBE/WBE certification applications, vendor registration, and contract compliance tracking. MODOT uses it for DBE certification, vendor registration, and DBE goal compliance on federally funded projects. If you want to bid on SLDC or MODOT contracts, or get certified by either agency, you must create and maintain a B2GNow account.',
    },
    {
      question: 'How do I register as a vendor in B2GNow?',
      answer:
        'Registering in B2GNow involves: (1) Go to the agency\'s B2GNow portal (SLDC or MODOT — each has a separate instance). (2) Create a vendor account with your business legal name, EIN/Tax ID, and contact information. (3) Select your NAICS codes (industries your business serves) — be accurate; these determine which solicitations you see. (4) Upload your certifications (MBE, WBE, DBE letters). (5) Complete your business profile: address, ownership details, bonding capacity, insurance information, and past performance. (6) Set up email notifications for solicitations matching your NAICS codes. Your profile must be current — expired certifications or outdated contact info will cause you to miss bid opportunities.',
    },
    {
      question: 'How do I find and respond to bids in B2GNow?',
      answer:
        'Finding bids in B2GNow: Log in and navigate to the "Solicitations" or "Bid Opportunities" section. Filter by your NAICS codes, contract value, and agency. Download the solicitation package — this includes the scope of work, evaluation criteria, required forms, and submission instructions. To respond: complete all required forms, attach your capability statement and certifications, ensure pricing is in the required format, and submit before the deadline. B2GNow timestamps submissions — late submissions are rejected with no exceptions. After submitting, you can track your bid status through the portal.',
    },
  ],
  sections: [
    {
      title: 'B2GNow Portal Cheat Sheet',
      icon: 'file',
      items: [
        { heading: 'SLDC B2GNow', text: 'Used for: MBE/WBE certification applications, City of St. Louis vendor registration, city contract bid submissions, and MWBE compliance reporting on awarded contracts. The SLDC portal also includes business development resources and networking event listings.' },
        { heading: 'MODOT B2GNow', text: 'Used for: DBE certification applications, MODOT vendor registration, DOT contract bid submissions, and DBE goal compliance tracking. MODOT\'s instance integrates with federal DBE reporting requirements.' },
        { heading: 'Profile Maintenance', text: 'Update your B2GNow profile whenever: your certification is renewed, your insurance is renewed, your bonding capacity changes, your NAICS codes expand, or your contact information changes. Stale profiles get filtered out of bid notifications.' },
        { heading: 'Compliance Reporting', text: 'After winning a contract, B2GNow becomes your compliance dashboard. You report MWBE/DBE utilization, submit certified payroll reports (prevailing wage jobs), and document good-faith efforts. Missing a compliance report can result in contract suspension.' },
        { heading: 'Common Registration Mistakes', text: '(1) Wrong NAICS codes — you will not see relevant bids. (2) Expired certifications uploaded — primes see you as unqualified. (3) Incomplete business profile — agencies skip incomplete vendors when issuing solicitation notifications. (4) One person\'s email for everything — if that person leaves, you lose portal access. Set up a shared company email as the primary contact.' },
      ],
    },
  ],
  cta: {
    title: 'Get Registered in B2GNow Correctly',
    text: 'We will set up your B2GNow profiles, select the right NAICS codes, and upload your certifications so you never miss a bid. Free 15-minute walkthrough.',
    button: 'Set Up B2GNow',
  },
  relatedPages: [
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service bid preparation and procurement strategy.' },
    { title: 'MBE Supplier vs. Subcontractor', path: '/contracts/mbe-supplier-vs-subcontractor', desc: 'Strategic decision guide for bidding as prime or subcontractor.' },
    { title: 'How Primes Evaluate MBE Participation', path: '/contracts/how-primes-evaluate-mbe', desc: 'What prime contractors look for when selecting MBE subcontractors.' },
  ],
};

export const howPrimesEvaluateMbe: ProgrammaticPageData = {
  slug: 'contracts/how-primes-evaluate-mbe',
  seo: {
    title: 'How Primes Evaluate MBE Subcontractors | MBE Participation Strategy',
    description:
      'How prime contractors evaluate and select MBE subcontractors for government projects. Certification requirements, pricing, past performance, and what makes an MBE attractive to primes in St. Louis.',
    keywords: ['prime contractor MBE evaluation', 'MBE subcontractor selection', 'how to get MBE subcontracts', 'prime contractor diversity goals', 'MBE participation strategy', 'attracting prime contractors'],
  },
  hero: {
    eyebrow: 'Prime Contractor Strategy',
    title: 'How Prime Contractors Evaluate MBE Subcontractors',
    subtitle:
      'Primes are not doing you a favor — they need certified MBE/WBE/DBE firms to meet their contract participation goals. Understanding exactly how they evaluate, select, and manage MBE subs puts you in the strongest negotiating position. Here is what happens behind the scenes in the prime\'s bid room.',
  },
  faqItems: [
    {
      question: 'What do primes look for when selecting an MBE subcontractor?',
      answer:
        'Primes evaluate MBE subcontractors on a weighted scorecard that typically includes: (1) Certification validity and applicability — 25% (is your certification current, from the right agency, and does it count toward this contract\'s goals?); (2) Price competitiveness — 25% (your scope price must keep the prime\'s overall bid competitive); (3) Capacity and capability — 20% (can you actually perform the scope on schedule?); (4) Past performance on similar projects — 15% (particularly government projects with compliance requirements); (5) Compliance infrastructure — 10% (certified payroll, insurance, safety programs, reporting capability); and (6) Relationship and responsiveness — 5% (did you respond to the prime\'s outreach promptly and professionally?). Primes keep score — often literally in a bid evaluation matrix. Know what\'s on it.',
    },
    {
      question: 'What does CUF mean and why does it matter for MBE credit?',
      answer:
        'CUF stands for Commercially Useful Function. It is the single most important concept in MBE subcontracting. Federal and local regulations require that MBE participation only counts toward contract goals if the MBE firm performs a "commercially useful function" — meaning the MBE actually executes the work with its own workforce, manages the scope, and carries the risk and profit. If an MBE is merely a pass-through — receiving a fee for allowing a non-MBE firm to use its certification — that is a CUF violation that can disqualify the contract\'s MBE credit, trigger an investigation, and potentially lead to debarment. The prime will scrutinize whether your scope involves real work performed by your firm. This is a compliance red line — never agree to a pass-through arrangement.',
    },
  ],
  sections: [
    {
      title: "The Prime's MBE Evaluation Scorecard",
      icon: 'check',
      items: [
        { heading: 'Certification (25%)', text: 'Current, valid certification from the required agency (SLDC, MODOT, MO OEO, SBA). Must match the contract\'s jurisdiction. Expired = disqualified, no exceptions. Dual certifications (MBE + WBE, or DBE + MBE) increase your value because they apply to multiple goal categories.' },
        { heading: 'Price Competitiveness (25%)', text: 'Your scope pricing must be within 10–15% of the prime\'s internal estimate. Primes bid competitively — if your price blows their budget, they will find another MBE. But do not underprice just to win; primes are suspicious of bids that look too low to perform the work.' },
        { heading: 'Capacity (20%)', text: 'Staffing plan, equipment list, project timeline, and bonding (if required). The prime needs confidence that you can deliver on schedule. Under-resourced MBEs are a liability — the prime\'s reputation and liquidated damages are on the line.' },
        { heading: 'Past Performance (15%)', text: 'References, project descriptions, and performance evaluations from previous primes or government agencies. At least one completed government project is ideal. If you have no government past performance, start with a smaller subcontract to build your record.' },
        { heading: 'Compliance Infrastructure (10%)', text: 'Certified payroll capability, insurance certificates (ACORD 25), safety program documentation, E-Verify compliance. Primes do not want to manage your compliance — they want you to handle it independently and provide reports on schedule.' },
        { heading: 'Relationship (5%)', text: 'Did you show up to the pre-bid meeting? Did you return the prime\'s phone call within 24 hours? Did you submit your scope proposal before their internal deadline? Responsiveness signals reliability — primes weight this more than the 5% suggests.' },
      ],
    },
  ],
  cta: {
    title: 'Make Your MBE Firm Prime-Ready',
    text: 'We will audit your certification, past performance, pricing, and compliance infrastructure against what primes actually evaluate. Free 15-minute readiness review.',
    button: 'Get Prime-Ready',
  },
  relatedPages: [
    { title: 'MBE Supplier vs. Subcontractor', path: '/contracts/mbe-supplier-vs-subcontractor', desc: 'Strategic decision guide for prime vs. subcontractor bidding.' },
    { title: 'CUF: Commercially Useful Function', path: '/contracts/cuf-commercially-useful-function', desc: 'Why CUF is the most important MBE compliance concept — and how to get it right.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service bid preparation and procurement navigation.' },
  ],
};

export const cufCommerciallyUsefulFunction: ProgrammaticPageData = {
  slug: 'contracts/cuf-commercially-useful-function',
  seo: {
    title: 'CUF Explained | Commercially Useful Function & MBE Compliance',
    description:
      'What CUF (Commercially Useful Function) means for MBE/DBE subcontractors. Why pass-through arrangements violate CUF, how primes verify CUF compliance, and how to structure your scope to satisfy CUF requirements.',
    keywords: ['CUF commercially useful function', 'MBE CUF compliance', 'DBE CUF requirements', 'MBE pass-through prohibition', 'MBE subcontracting rules', 'CUF violation consequences'],
  },
  hero: {
    eyebrow: 'MBE Compliance · Critical',
    title: 'CUF: Commercially Useful Function Explained',
    subtitle:
      'CUF is the most important — and most violated — rule in MBE subcontracting. If your MBE firm does not perform a commercially useful function, the prime loses credit for your participation, your certification can be revoked, and both parties can face debarment. Here is exactly what CUF means and how to structure your scope so it passes every scrutiny.',
  },
  faqItems: [
    {
      question: 'What exactly is a Commercially Useful Function (CUF)?',
      answer:
        'A Commercially Useful Function means the MBE/DBE firm actually performs, manages, and supervises the work with its own workforce and equipment. The MBE must: carry the risk and profit of the scope; use its own employees (not the prime\'s) to perform the work; manage and supervise the work independently; and purchase, lease, or own the materials and equipment used. The four-part CUF test: (1) Is the MBE doing real work or just processing paperwork? (2) Does the MBE control the means and methods of the work? (3) Is the MBE\'s compensation commensurate with the work performed and risk assumed? (4) Is the MBE\'s role consistent with industry practice for that scope? If the answer to any is "no," CUF is at risk.',
    },
    {
      question: 'What is a pass-through and why is it a CUF violation?',
      answer:
        'A pass-through (also called a broker or front arrangement) is when an MBE\'s participation consists only of allowing its name and certification to be used while another firm (usually non-MBE) performs the actual work. Examples: the MBE subcontracts 100% of its scope to a non-MBE without adding value; the MBE only handles invoicing while the prime or another sub does the work; the MBE takes a fee (e.g., 2–5%) just for "arranging" the subcontract. These are CUF violations. The MBE must perform its scope with its own workforce — the industry standard is that an MBE self-performs at least 30% of its subcontract value with its own employees. Anything less invites a CUF investigation.',
    },
  ],
  sections: [
    {
      title: 'How to Structure Your Scope to Satisfy CUF',
      icon: 'check',
      items: [
        { heading: 'Use Your Own Workforce', text: 'At least 30% of your subcontract dollar value should be performed by your direct employees. The remaining can be subcontracted, but your firm must manage and supervise those sub-subs. Document: payroll records, W-2s, timesheets, and daily reports showing your employees on site performing the work.' },
        { heading: 'Control Your Means and Methods', text: 'Your firm decides how the work gets done — equipment selection, crew composition, work sequence. You do not take direction from the prime on operational decisions (scheduling coordination is different from work direction). Document: your superintendent\'s daily logs and your safety program implementation.' },
        { heading: 'Carry Real Risk', text: 'Your subcontract should carry standard commercial terms — you are responsible for schedule, quality, and safety on your scope. Your compensation should include profit margin, not just a nominal processing fee. A fixed-price subcontract with performance obligations demonstrates CUF better than a cost-plus or time-and-materials arrangement.' },
        { heading: 'Supply Your Own Materials and Equipment', text: 'Purchase or lease the materials and equipment used in your scope. Do not use the prime\'s equipment or materials except in incidental cases. Document: your purchase orders, equipment rental agreements, and material invoices.' },
        { heading: 'Document Everything', text: 'In a CUF audit (which can happen during or after the project), you must prove your firm performed the work. Maintain: daily reports, payroll records, equipment logs, material invoices, subcontracts with your sub-subs, and correspondence showing your management role. Assume you will be audited and document accordingly from day one.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your MBE Scope CUF-Compliant',
    text: 'We will review your subcontract structure and ensure your scope passes the CUF test. Do not risk your certification or the prime\'s contract goals. Free review.',
    button: 'Check CUF Compliance',
  },
  relatedPages: [
    { title: 'How Primes Evaluate MBE Participation', path: '/contracts/how-primes-evaluate-mbe', desc: 'The prime contractor\'s perspective on selecting and managing MBE subcontractors.' },
    { title: 'MBE Supplier vs. Subcontractor', path: '/contracts/mbe-supplier-vs-subcontractor', desc: 'Strategic decision framework for prime vs. subcontractor bidding.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract compliance and procurement support.' },
  ],
};

export const babaaCompliance: ProgrammaticPageData = {
  slug: 'contracts/babaa-compliance',
  seo: {
    title: 'BABAA Compliance for Government Contractors | Build America Buy America Act',
    description:
      'BABAA (Build America Buy America Act) compliance for Missouri government contractors. What BABAA requires for construction materials, iron/steel, manufactured products. How it affects MBE/DBE suppliers.',
    keywords: ['BABAA compliance', 'Build America Buy America Act', 'BABAA construction materials', 'BABAA iron steel', 'BABAA manufactured products', 'government contract domestic sourcing'],
  },
  hero: {
    eyebrow: 'Federal Compliance',
    title: 'BABAA Compliance: Build America Buy America Act',
    subtitle:
      'The Build America Buy America Act (BABAA) requires that iron, steel, manufactured products, and construction materials used on federally funded infrastructure projects be produced in the United States. If you supply materials to MODOT, Metro, MSD, or any federally funded project, BABAA applies to you. Here is what you need to know.',
  },
  faqItems: [
    {
      question: 'What is BABAA and what does it require?',
      answer:
        'The Build America Buy America Act (BABAA), enacted as part of the Infrastructure Investment and Jobs Act (IIJA) of 2021, requires that all iron, steel, manufactured products, and construction materials used in federally funded infrastructure projects be produced in the United States. "Produced in the United States" means: for iron and steel — all manufacturing processes, from initial melting through application of coatings, must occur in the U.S.; for manufactured products — the product must be manufactured in the U.S. and the cost of U.S.-produced components must exceed 55% of total component cost; for construction materials — all manufacturing processes for the material must occur in the U.S. BABAA applies to any project receiving federal financial assistance for infrastructure — including MODOT highway projects, Metro transit projects, MSD water infrastructure, and any project with USDOT, EPA, or HUD funding.',
    },
    {
      question: 'How does BABAA affect MBE and DBE suppliers?',
      answer:
        'BABAA significantly affects MBE/DBE material suppliers because: (1) You must certify that all iron and steel products you supply are U.S.-produced. This requires documentation from your supply chain — mill certificates, country-of-origin certifications, and manufacturing process documentation. (2) Many construction materials historically sourced from overseas (specialty steel, certain pipe fittings, electrical components) now require domestic sourcing or a BABAA waiver. (3) Waivers are available in limited circumstances — unreasonable cost (25%+ premium), non-availability, or public interest — but must be requested and approved by the federal awarding agency before procurement. (4) Primes will require BABAA compliance certifications from every supplier and subcontractor providing materials. If you cannot certify, the prime cannot use your materials on the project.',
    },
  ],
  sections: [
    {
      title: 'BABAA Compliance Checklist for Suppliers',
      icon: 'check',
      items: [
        { heading: 'Iron & Steel', text: 'All manufacturing processes must occur in the U.S. — melting, refining, casting, rolling, drawing, and coating. Foreign steel that is merely cut or shaped in the U.S. does not qualify. Mill test certificates showing U.S. origin are the standard documentation.' },
        { heading: 'Manufactured Products', text: 'Must be manufactured in the U.S. AND the cost of U.S. components must exceed 55% of total component cost. This applies to products like electrical panels, pumps, HVAC equipment, and prefabricated structures. Supplier certifications and component cost breakdowns are required.' },
        { heading: 'Construction Materials', text: 'Non-ferrous materials (lumber, glass, fiber optic cable, plastic pipe, aggregates) must have all manufacturing processes occur in the U.S. This is a newer category under BABAA — previously, only iron and steel had domestic preference for non-DOT projects.' },
        { heading: 'Waiver Process', text: 'If domestic material is unavailable or unreasonably expensive (25%+ above foreign equivalent), the federal awarding agency can issue a BABAA waiver. Waivers are project-specific, not blanket. The prime or agency must request the waiver before procurement. Suppliers should flag potential BABAA issues early so there is time for the waiver process.' },
        { heading: 'Documentation', text: 'Maintain: mill certificates, country-of-origin statements, manufacturer certifications, and component cost breakdowns for every BABAA-covered item you supply. This documentation must flow from your suppliers through you to the prime and ultimately to the government agency for audit.' },
      ],
    },
  ],
  cta: {
    title: 'Are Your Materials BABAA Compliant?',
    text: 'We will review your supply chain documentation and identify any BABAA exposure on your current or upcoming contracts. Free 15-minute assessment.',
    button: 'Check BABAA Compliance',
  },
  relatedPages: [
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract compliance, certification, and procurement support.' },
    { title: 'Prevailing Wage Basics', path: '/contracts/prevailing-wage-basics', desc: 'Understanding prevailing wage requirements on government construction contracts.' },
    { title: 'Insurance Requirements on GC Bids', path: '/contracts/insurance-requirements-gc-bids', desc: 'ACORD 25, additional insured, and insurance requirements for government contracts.' },
  ],
};

export const prevailingWageBasics: ProgrammaticPageData = {
  slug: 'contracts/prevailing-wage-basics',
  seo: {
    title: 'Prevailing Wage Basics for Government Contractors | Missouri Davis-Bacon',
    description:
      'Understanding prevailing wage and Davis-Bacon requirements on Missouri government construction contracts. Certified payroll, wage determinations, worker classification, and common mistakes.',
    keywords: ['prevailing wage Missouri', 'Davis-Bacon requirements', 'certified payroll government contracts', 'prevailing wage construction', 'government contract payroll', 'Missouri prevailing wage rates'],
  },
  hero: {
    eyebrow: 'Compliance',
    title: 'Prevailing Wage Basics for Government Contractors',
    subtitle:
      'If you work on a government-funded construction project over $2,000, you are paying prevailing wages — whether you know it or not. The Davis-Bacon Act and Missouri prevailing wage law dictate exactly what you must pay each worker classification. Non-compliance triggers back-wage liabilities, contract suspension, and debarment. Here is what you need to know.',
  },
  faqItems: [
    {
      question: 'What is prevailing wage and when does it apply?',
      answer:
        'Prevailing wage is the minimum hourly wage plus fringe benefits that must be paid to workers on government-funded construction projects. It applies to: all federal and federally assisted construction projects over $2,000 under the Davis-Bacon Act (this includes MODOT, Metro, MSD, and HUD-funded projects); Missouri state-funded construction projects under Missouri prevailing wage law (Section 290); and many local government projects. The "prevailing" rate is determined by the U.S. Department of Labor (federal) or Missouri Department of Labor (state) based on surveys of what workers in each classification actually earn in the project\'s county. Your contract will include a wage determination listing the required rates for each worker classification used on the project.',
    },
    {
      question: 'What is certified payroll and how do I submit it?',
      answer:
        'Certified payroll is Form WH-347 (federal) or the state equivalent — a weekly report listing every worker on the project, their classification, hours worked, hourly rate, gross wages, deductions, and net pay. You must: (1) submit certified payroll weekly to the prime contractor or government agency; (2) include a signed statement of compliance certifying that wages paid meet or exceed the prevailing rates; (3) maintain payroll records for at least 3 years after project completion; and (4) post the applicable wage determination at the job site. B2GNow and other procurement portals often have electronic certified payroll submission. Falsifying certified payroll is a federal crime — the penalties are severe.',
    },
    {
      question: 'What is the difference between wages and fringe benefits for prevailing wage?',
      answer:
        'The prevailing wage rate has two components: the basic hourly rate (cash wages) and fringe benefits. You can satisfy the fringe benefit portion by: paying the fringe amount in cash (added to the hourly rate), or contributing to bona fide benefit plans (health insurance, pension, vacation, training) at least equal to the fringe amount. Example: if the wage determination says $25.00 base + $10.00 fringe, you can pay $35.00/hour in cash OR $25.00/hour plus $10.00/hour contributed to benefits. You cannot pay $25.00/hour with no benefits — that is underpayment even if the worker agreed to it. The fringe contribution must be documented for every worker on every certified payroll report.',
    },
  ],
  sections: [
    {
      title: 'Prevailing Wage Compliance Checklist',
      icon: 'check',
      items: [
        { heading: 'Wage Determination', text: 'Every government construction contract must include the applicable wage determination. Post it at the job site. Review the worker classifications — using the wrong classification (e.g., "laborer" vs. "carpenter" for work that is actually carpentry) is a common violation.' },
        { heading: 'Worker Classification', text: 'Accurately classify each worker based on the work actually performed, not their job title. A "laborer" operating a power saw is probably a carpenter at carpenter rates. Misclassification is the #1 prevailing wage violation and is treated as intentional underpayment.' },
        { heading: 'Certified Payroll (WH-347)', text: 'Submit weekly. Include: worker name, last 4 of SSN, classification, hours worked (straight time and overtime), hourly rate, gross wages, deductions, and net pay. Sign the statement of compliance. Keep copies — DOL can audit up to 3 years after project completion.' },
        { heading: 'Overtime', text: 'Davis-Bacon requires overtime at 1.5x the basic rate for hours over 40 in a workweek. Fringe benefits do not need to be multiplied by 1.5. The overtime calculation is: (base rate × 1.5) + fringe rate. Example: $25.00 base + $10.00 fringe = ($25.00 × 1.5) + $10.00 = $47.50/hour for overtime.' },
        { heading: 'Apprentices & Trainees', text: 'Registered apprentices in USDOL-approved programs can be paid less than the journeyman rate — at the percentage specified in their apprenticeship agreement. You must have a copy of the apprenticeship agreement and the apprentice\'s registration on file. Unregistered "trainees" must be paid full prevailing rates.' },
        { heading: 'Common Violations', text: '(1) Misclassifying workers to pay lower rates. (2) Not paying the full fringe benefit amount. (3) Not submitting certified payroll on time. (4) Not posting the wage determination at the job site. (5) Deducting tools, transportation, or other costs that bring the worker\'s effective pay below the prevailing rate.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your Payroll Compliance Right',
    text: 'We will review your certified payroll process, worker classifications, and fringe benefit structure before an auditor does. Free 15-minute assessment.',
    button: 'Audit Your Payroll',
  },
  relatedPages: [
    { title: 'BABAA Compliance', path: '/contracts/babaa-compliance', desc: 'Build America Buy America Act requirements for federally funded projects.' },
    { title: 'Insurance Requirements on GC Bids', path: '/contracts/insurance-requirements-gc-bids', desc: 'ACORD 25 certificates and insurance requirements for government contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract compliance support.' },
  ],
};

export const insuranceRequirementsGcBids: ProgrammaticPageData = {
  slug: 'contracts/insurance-requirements-gc-bids',
  seo: {
    title: 'Insurance Requirements on Government Contract Bids | ACORD 25 Guide',
    description:
      'Insurance requirements for government construction contracts in Missouri. General liability, workers comp, auto, excess/umbrella limits, ACORD 25 additional insured, and how primes evaluate your insurance package.',
    keywords: ['government contract insurance', 'ACORD 25', 'additional insured', 'GC insurance requirements', 'construction insurance Missouri', 'general liability government contracts', 'workers comp government contracts'],
  },
  hero: {
    eyebrow: 'Risk Management',
    title: 'Insurance Requirements on Government Contract Bids',
    subtitle:
      'Your insurance package is evaluated before your price. Missing a required coverage, getting the additional-insured language wrong, or carrying insufficient limits disqualifies your bid before anyone reads your proposal. Here is the insurance you need to bid and win government contracts in Missouri.',
  },
  faqItems: [
    {
      question: 'What insurance do I need to bid on government construction contracts?',
      answer:
        'Standard insurance requirements for government contractors (prime or sub): Commercial General Liability (CGL): $1,000,000 per occurrence, $2,000,000 aggregate — with the prime and owner/government agency named as additional insureds via ACORD 25 certificate. Workers\' Compensation: statutory limits per Missouri law — this is mandatory for any business with employees. Automobile Liability: $1,000,000 combined single limit — covering all vehicles used on the project. Excess/Umbrella Liability: $2,000,000–$5,000,000 — sitting above the CGL, auto, and employer\'s liability. Professional Liability (E&O): $1,000,000–$2,000,000 — required for design professionals and often for construction managers. Builder\'s Risk: project-specific property insurance — typically carried by the prime or owner. The specific limits vary by contract — always read the insurance exhibit in the solicitation.',
    },
    {
      question: 'What is an ACORD 25 and how do I fill it out correctly for a government contract?',
      answer:
        'The ACORD 25 is the standard Certificate of Liability Insurance form. The most common mistake on government contracts is the additional-insured endorsement. The ACORD 25 must: (1) name the prime contractor, government agency, and project owner as "Additional Insured" in the Description of Operations box; (2) reference the specific project name, contract number, and location; (3) include the additional-insured endorsement form number (CG 20 10 for ongoing operations, CG 20 37 for completed operations); (4) be signed by an authorized representative of your insurance carrier (not your agent — the carrier). The ACORD 25 itself only provides evidence of coverage; the actual additional-insured protection comes from the endorsement attached to your policy. Ensure your carrier issues both the certificate AND the endorsement — primes and government agencies will request proof of both.',
    },
    {
      question: 'How do MBE/DBE firms manage insurance costs?',
      answer:
        'Insurance is one of the largest overhead costs for MBE/DBE construction and service firms. Strategies to manage costs: (1) Work with an insurance broker who specializes in construction — they understand government contract requirements and can shop multiple carriers. (2) Ask about MBE/DBE-specific programs — some carriers offer diversity-supplier insurance programs with competitive rates. (3) Start with lower-limit subcontracts to establish a loss history, then increase limits as revenue grows. (4) Negotiate annual policies rather than project-specific — annual policies are cheaper per project when you work multiple contracts. (5) Pass through insurance costs in your pricing — primes expect it; including insurance in your overhead markup is standard practice, not a competitive disadvantage.',
    },
  ],
  sections: [
    {
      title: 'Insurance Checklist for Government Contracts',
      icon: 'check',
      items: [
        { heading: 'Commercial General Liability', text: '$1M/$2M minimum. Must include: premises/operations, products/completed operations, contractual liability, and independent contractors coverage. Additional insured: prime contractor and government agency (via CG 20 10 and CG 20 37 endorsements).' },
        { heading: 'Workers\' Compensation', text: 'Missouri statutory limits. Must cover all employees. If you are a sole proprietor with no employees, you may be exempt — but primes often still require coverage. Check the contract\'s specific requirement.' },
        { heading: 'Automobile Liability', text: '$1M combined single limit. Covers all owned, hired, and non-owned vehicles used on the project. If you use personal vehicles for project work, your personal auto policy is typically insufficient — you need a commercial auto policy.' },
        { heading: 'Umbrella/Excess Liability', text: '$2M–$5M minimum. Must follow form over your CGL, auto, and employer\'s liability. The umbrella is what protects you from catastrophic claims — do not go without it on a government project.' },
        { heading: 'ACORD 25 Certificate', text: 'Must name the additional insureds exactly as specified in the contract. Must be issued by your insurance carrier (not just your agent). Must list the endorsements providing the additional-insured status. Submit with your bid — missing or incorrect ACORD 25 is a common bid rejection reason.' },
        { heading: 'Subcontractor Flow-Down', text: 'If you are a prime, your subcontractors must carry equivalent insurance and name you as additional insured. This is a mandatory flow-down requirement — if your sub causes a loss and lacks insurance, your policy responds, and your premiums will increase.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your Insurance Package Bid-Ready',
    text: 'We will review the insurance requirements on your target contracts and help you present a compliant, competitive insurance package.',
    button: 'Review Insurance',
  },
  relatedPages: [
    { title: 'Prevailing Wage Basics', path: '/contracts/prevailing-wage-basics', desc: 'Davis-Bacon and Missouri prevailing wage requirements for government construction.' },
    { title: 'BABAA Compliance', path: '/contracts/babaa-compliance', desc: 'Build America Buy America Act domestic sourcing requirements.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service bid preparation and procurement strategy.' },
  ],
};

export const readingMhdcBidPackage: ProgrammaticPageData = {
  slug: 'contracts/reading-mhdc-bid-package',
  seo: {
    title: 'How to Read an MHDC Bid Package | Missouri Housing Development Commission',
    description:
      'Guide to reading and responding to MHDC (Missouri Housing Development Commission) bid packages. Understanding scopes, MBE goals, evaluation criteria, and the forms required for MHDC-funded construction projects.',
    keywords: ['MHDC bid package', 'Missouri Housing Development Commission', 'MHDC contracts', 'affordable housing contracts Missouri', 'MHDC MBE goals', 'reading government bid packages'],
  },
  hero: {
    eyebrow: 'Bid Reading',
    title: 'How to Read an MHDC Bid Package',
    subtitle:
      'Missouri Housing Development Commission (MHDC) bid packages are thick, complex, and unforgiving — miss a required form and your bid is non-responsive. Here is a systematic method for breaking down an MHDC solicitation, understanding the MBE goals, and building a compliant response.',
  },
  faqItems: [
    {
      question: 'What is MHDC and what types of contracts do they issue?',
      answer:
        'The Missouri Housing Development Commission (MHDC) finances affordable housing development across Missouri through low-income housing tax credits (LIHTC), HOME funds, and other federal and state programs. MHDC does not directly issue construction contracts — rather, developers who receive MHDC funding must comply with MHDC procurement requirements, including MBE/WBE participation goals. As a contractor or subcontractor, you will be bidding to the developer or general contractor, but your work must comply with MHDC requirements. Understanding MHDC bid package structure is essential because the developer\'s solicitation will incorporate MHDC-mandated forms, goals, and reporting requirements.',
    },
    {
      question: 'How do I break down an MHDC bid package systematically?',
      answer:
        'When you receive an MHDC-related bid package, read it in this order: (1) Cover page / Invitation to Bid — contract value, bid due date, pre-bid meeting date, MBE/WBE goal percentage. (2) Scope of Work — what are you actually building? Identify your trade(s) in the scope. (3) MBE/WBE Participation Schedule (MHDC Form) — this is the form listing the MBE/WBE goal, the subcontracting opportunities, and your plan to meet the goal. It must be submitted with your bid. (4) Bid Form — the pricing sheet. Every line must be filled in; blanks or "N/A" may be treated as non-responsive. (5) Required Submittals Checklist — every form listed here must be included or your bid is disqualified. (6) General Conditions / Special Conditions — insurance requirements, prevailing wage determination, project schedule, liquidated damages. Circle every obligation and deadline. (7) Plans and Specifications — the technical documents your estimator will price.',
    },
  ],
  sections: [
    {
      title: 'MHDC Bid Package Checklist',
      icon: 'file',
      items: [
        { heading: 'MBE/WBE Goal', text: 'MHDC projects typically carry MBE/WBE participation goals of 15–25%. The goal percentage is stated in the bid documents. You must submit a MBE/WBE Participation Schedule showing how you will meet the goal through certified subcontractors — or document good-faith efforts if the goal cannot be met.' },
        { heading: 'MHDC Forms', text: 'Key MHDC forms in the bid package include: MBE/WBE Participation Schedule, Bidder\'s Certification, Non-Collusive Affidavit, Certificate of Compliance with Section 3 (HUD), and E-Verify Affirmation. Every form must be signed, notarized if required, and included with your bid submission.' },
        { heading: 'Prevailing Wage', text: 'MHDC projects using federal funds (HOME, CDBG) are subject to Davis-Bacon prevailing wage requirements. Your bid must include labor rates at or above the wage determination included in the bid package. State-funded MHDC projects follow Missouri prevailing wage law. Verify which wage determination applies.' },
        { heading: 'Section 3 Compliance', text: 'Section 3 of the HUD Act requires that economic opportunities (jobs and contracts) generated by HUD-funded projects go to low- and very low-income persons and businesses. MHDC project bid packages include Section 3 compliance forms and reporting requirements. This is separate from MBE/WBE — Section 3 is based on income status, not minority/women ownership.' },
        { heading: 'Evaluation Criteria', text: 'MHDC bids are typically awarded to the lowest responsive and responsible bidder. "Responsive" means your bid includes all required forms and meets all specifications. "Responsible" means your firm has the capacity and track record to perform. Provide references, past performance, and bonding/insurance evidence even if not explicitly required — it establishes responsibility.' },
      ],
    },
  ],
  cta: {
    title: 'Get Help With Your MHDC Bid Response',
    text: 'We will help you break down the bid package, complete the MBE/WBE forms, and build a compliant bid response. Free 15-minute bid review.',
    button: 'Review an MHDC Bid',
  },
  relatedPages: [
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service bid preparation, procurement strategy, and compliance support.' },
    { title: 'Prevailing Wage Basics', path: '/contracts/prevailing-wage-basics', desc: 'Davis-Bacon and Missouri prevailing wage requirements for construction projects.' },
    { title: 'MBE Supplier vs. Subcontractor', path: '/contracts/mbe-supplier-vs-subcontractor', desc: 'Should you bid this project as a prime, sub, or supplier?' },
  ],
};

export const governmentBidChecklist: ProgrammaticPageData = {
  slug: 'contracts/government-bid-checklist',
  seo: {
    title: 'Government Bid Checklist | Complete Submittal Requirements for Missouri Contracts',
    description:
      'Complete government bid submission checklist for Missouri contractors. Required forms, certifications, pricing schedules, and supporting documents for city, state, and federal contract bids. Never miss a form again.',
    keywords: ['government bid checklist', 'bid submission requirements', 'Missouri government bids', 'bid forms checklist', 'responsive bid requirements', 'government contract submittals'],
  },
  hero: {
    eyebrow: 'Bid Preparation',
    title: 'The Government Bid Submission Checklist',
    subtitle:
      'Government RFPs evaluate compliance before they evaluate competence. A missing form, an unsigned page, or a misplaced decimal in your bid bond makes your entire proposal non-responsive. Here is the complete checklist to ensure your bid makes it past the first review.',
  },
  faqItems: [
    {
      question: 'What makes a bid non-responsive?',
      answer:
        'A bid is non-responsive when it fails to comply with the material requirements of the solicitation. Common non-responsiveness triggers: missing bid bond or bid guarantee (if required), unsigned bid form, missing MBE/WBE participation schedule, pricing errors (blanks, illegible numbers, or conditional pricing), late submission (government bid deadlines are absolute — one second late = disqualified), and missing mandatory forms (non-collusion affidavit, debarment certification, E-Verify affirmation). Non-responsive bids are rejected without evaluation of your qualifications or pricing — the government cannot waive material requirements. Pre-bid checklist review is the cheapest insurance you can buy.',
    },
  ],
  sections: [
    {
      title: 'Every Bid Package Must Include:',
      icon: 'check',
      items: [
        { heading: 'Bid Form', text: 'Complete every field. No blanks. No "TBD." No conditional language. Signed in ink or digitally per the solicitation\'s requirements.' },
        { heading: 'Bid Bond / Bid Guarantee', text: 'If required, typically 5–10% of bid amount. Must be issued by a surety licensed in Missouri. Power of Attorney for the surety agent must be attached.' },
        { heading: 'MBE/WBE/DBE Participation Schedule', text: 'List every certified subcontractor or supplier, their certification type and expiration date, scope of work, and dollar value. If you are self-performing to meet the goal, document your own certification.' },
        { heading: 'Non-Collusion Affidavit', text: 'Sworn statement that your bid was developed independently, without collusion with other bidders. Must be notarized. Standard across all Missouri government solicitations.' },
        { heading: 'Debarment/Suspension Certification', text: 'Certification that your firm is not debarred, suspended, or otherwise excluded from federal or state contracting. Check SAM.gov and MissouriBUYS for any active exclusions before signing.' },
        { heading: 'Insurance Certificates', text: 'ACORD 25 showing required coverages and limits. Additional-insured endorsements naming the owner and government agency. Some solicitations require submission with the bid; others allow post-award submission — read the instructions.' },
        { heading: 'References / Past Performance', text: 'List of similar projects completed in the last 3–5 years with owner contact information. Highlight government projects — they carry more weight than private projects for government evaluators.' },
        { heading: 'Capability Statement', text: 'One-page summary of your firm: certifications, NAICS codes, bonding capacity, key personnel, and representative projects. Include it even if not required — it helps evaluators understand who you are.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your Bid Package Reviewed Before Submission',
    text: 'We will check every form, every field, and every attachment against the solicitation requirements. Do not get disqualified for a missing signature. Free bid review.',
    button: 'Review My Bid',
  },
  relatedPages: [
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract bid preparation and procurement support.' },
    { title: 'How B2GNow Works', path: '/contracts/how-b2gnow-works', desc: 'Vendor registration and bid submission in the B2GNow procurement portal.' },
    { title: 'Reading an MHDC Bid Package', path: '/contracts/reading-mhdc-bid-package', desc: 'How to break down and respond to Missouri Housing Development Commission bid packages.' },
  ],
};