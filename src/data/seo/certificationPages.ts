import type { ProgrammaticPageData } from '../../components/seo/ProgrammaticSeoPage';

// ── Set A: Certification Pages (≈12 pages) ──────────────────────────────
// One page per certification × jurisdiction that Missouri businesses chase.
// Template: what it is, who qualifies, exact document checklist, realistic
// timeline, common denial reasons, what it actually gets you locally, CTA.

export const sldcMbeCertification: ProgrammaticPageData = {
  slug: 'certifications/sldc-mbe-certification',
  seo: {
    title: 'SLDC MBE Certification | St. Louis City Minority Business Enterprise',
    description:
      'Complete guide to SLDC MBE certification for City of St. Louis contracts. Eligibility requirements, document checklist, application timeline, common denial reasons, and what MBE certification actually gets you in St. Louis.',
    keywords: [
      'SLDC MBE certification',
      'St. Louis minority business certification',
      'SLDC MBE application',
      'City of St. Louis MBE',
      'SLDC certification requirements',
      'MBE St. Louis city contracts',
    ],
  },
  hero: {
    eyebrow: 'City-Level · SLDC',
    title: 'SLDC MBE Certification',
    subtitle:
      'The St. Louis Development Corporation (SLDC) MBE certification is the gateway to City of St. Louis contracts with minority participation goals. Here is exactly what you need — eligibility, documents, timeline, and the mistake that gets most applications denied.',
  },
  faqItems: [
    {
      question: 'Who qualifies for SLDC MBE certification?',
      answer:
        'To qualify for SLDC MBE certification, your business must be at least 51% owned, operated, and controlled by one or more minority individuals who are U.S. citizens or lawful permanent residents. SLDC recognizes the following groups as minorities: African American/Black, Hispanic/Latino, Asian American, Native American/Alaska Native, and Native Hawaiian/Pacific Islander. The minority owner(s) must demonstrate both operational and managerial control — not just ownership on paper. Your business must also be located in the St. Louis metropolitan area or have a significant economic presence here.',
    },
    {
      question: 'What documents are required for the SLDC MBE application?',
      answer:
        'The SLDC MBE application requires: completed SLDC MBE application form, 3 years of personal tax returns for each owner, 3 years of business tax returns, personal financial statement (net worth) for each owner, proof of U.S. citizenship or permanent residency, business formation documents (articles of incorporation/organization), operating agreement or bylaws, stock certificates and stock ledger (for corporations), proof of 51% minority ownership, résumé demonstrating management and technical capability, business lease or deed, evidence of business location, bank signature authorization cards, equipment and asset inventory, client contracts and work history, and business licenses. Missing documents are the #1 reason for denial — SLDC does not chase incomplete applications; they go to the bottom of the review queue.',
    },
    {
      question: 'How long does SLDC MBE certification take?',
      answer:
        'SLDC MBE certification typically takes 60–90 days from submission of a complete application. However, with a fully-prepared, pre-reviewed document package, our clients average 45–60 days to approval. Incomplete applications can take 120+ days because SLDC returns them to the applicant for corrections and resets the review timeline. The fastest path is front-loading all document preparation before submission — which is exactly what we do.',
    },
    {
      question: 'What are the most common SLDC MBE denial reasons?',
      answer:
        'The five most common SLDC MBE denial reasons are: (1) incomplete documentation — missing tax returns, unsigned forms, or outdated financial statements; (2) ownership below 51% — the minority owner does not hold a true majority stake when all ownership classes are counted; (3) insufficient operational control — the minority owner exists on paper but does not make the day-to-day business decisions; (4) non-minority control of day-to-day operations — a non-minority spouse, family member, or investor runs the business; and (5) business location outside the service area without demonstrated economic presence in St. Louis. We review for all five before you submit.',
    },
    {
      question: 'What does SLDC MBE certification actually get me?',
      answer:
        'SLDC MBE certification qualifies your firm for City of St. Louis contracts with MBE participation goals — typically 20–25% on construction projects and 15–20% on professional services. It also makes you eligible for SLDC\'s business development programs, technical assistance, and networking events with prime contractors. Beyond the city, many St. Louis County projects and private-sector supplier diversity programs recognize SLDC certification. It is not a guarantee of contracts, but it gets you into the room — and primes with participation goals actively seek certified firms.',
    },
  ],
  sections: [
    {
      title: 'SLDC MBE Eligibility at a Glance',
      icon: 'check',
      items: [
        { heading: 'Ownership', text: 'At least 51% owned by minority individuals who are U.S. citizens or lawful permanent residents. Ownership must be real, not pro-forma — documented through stock certificates, operating agreements, and capital contributions.' },
        { heading: 'Control', text: 'Minority owner(s) must control day-to-day operations, sign contracts, hire/fire employees, and make financial decisions. A non-minority manager running daily operations will cause denial.' },
        { heading: 'Management', text: 'The minority owner must hold the highest management position (CEO, President, Managing Member) and have the technical expertise appropriate to the business. A résumé demonstrating relevant experience is required.' },
        { heading: 'Economic Presence', text: 'Your business must be located in the St. Louis metropolitan area or demonstrate significant economic activity here — client contracts, employees, or a physical presence.' },
        { heading: 'Independence', text: 'The business must be independent — not a subsidiary, franchise, or alter-ego of a non-minority-owned firm. Commingling of resources with a non-minority business is a red flag.' },
        { heading: 'Size Standards', text: 'Your business must meet the SBA small business size standard for your industry. SLDC cross-references NAICS codes to verify eligibility.' },
      ],
    },
    {
      title: 'The SLDC Application Process, Step by Step',
      icon: 'clock',
      items: [
        { heading: 'Pre-Application Preparation (Week 1–2)', text: 'Gather all required documents. Complete the personal financial statement. Draft your business narrative describing ownership, management structure, and business capabilities. Have legal counsel review your operating agreement for MBE compliance.' },
        { heading: 'Online Application Portal (Week 2–3)', text: 'Create an account on the SLDC B2GNow vendor portal. Complete the online application form. Upload all supporting documents in the required formats. Double-check every field — errors cause delays.' },
        { heading: 'SLDC Review Period (Days 30–60)', text: 'SLDC assigns a certification analyst who reviews your package, verifies documents, and may request additional information. Respond to requests within 7 days to avoid timeline resets.' },
        { heading: 'Site Visit (Days 45–75)', text: 'SLDC may conduct an on-site visit to verify your business location, operations, and management. The analyst will interview the minority owner(s) and review original documents.' },
        { heading: 'Certification Decision (Days 60–90)', text: 'If approved, you receive an SLDC MBE certification letter valid for 2–3 years, depending on the program. If denied, you receive a written explanation and may appeal or reapply after addressing the deficiencies.' },
      ],
    },
  ],
  cta: {
    title: 'Ready to Get SLDC MBE Certified?',
    text: 'Free 15-minute eligibility review. We will tell you if you qualify, what documents you need, and how long it will take — no obligation.',
    button: 'Check Your MBE Eligibility',
  },
  relatedPages: [
    { title: 'SLDC WBE Certification', path: '/certifications/sldc-wbe-certification', desc: 'Women Business Enterprise certification for City of St. Louis contracts.' },
    { title: 'MO OEO MBE/WBE Certification', path: '/mbe-certification-missouri', desc: 'State-level MBE/WBE certification for Missouri state agency contracts.' },
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Federal DBE certification for USDOT-funded transportation contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service bid support and procurement strategy for government contracts.' },
  ],
};

export const sldcWbeCertification: ProgrammaticPageData = {
  slug: 'certifications/sldc-wbe-certification',
  seo: {
    title: 'SLDC WBE Certification | St. Louis Women Business Enterprise',
    description:
      'Complete guide to SLDC WBE certification for City of St. Louis contracts. Eligibility, documents, timeline, and common mistakes for women-owned businesses seeking city contract access.',
    keywords: [
      'SLDC WBE certification',
      'St. Louis women business certification',
      'WBE St. Louis city contracts',
      'SLDC women business enterprise',
      'WBE certification requirements',
      'women owned business St. Louis',
    ],
  },
  hero: {
    eyebrow: 'City-Level · SLDC',
    title: 'SLDC WBE Certification',
    subtitle:
      'Women-owned businesses in St. Louis can access city contracts through SLDC WBE certification. The process is similar to MBE but with distinct eligibility criteria. Here is your complete guide — from eligibility to approval.',
  },
  faqItems: [
    {
      question: 'Who qualifies for SLDC WBE certification?',
      answer:
        'To qualify for SLDC WBE certification, your business must be at least 51% owned, operated, and controlled by one or more women who are U.S. citizens or lawful permanent residents. The woman owner(s) must demonstrate real operational control — signing contracts, making financial decisions, and managing day-to-day operations. The business must be independent (not a subsidiary of a male-owned firm) and have a significant economic presence in the St. Louis metropolitan area.',
    },
    {
      question: 'What documents are required for SLDC WBE certification?',
      answer:
        'The SLDC WBE application requires: completed SLDC WBE application form, 3 years of personal tax returns for each owner, 3 years of business tax returns, personal financial statement for each owner, proof of U.S. citizenship or permanent residency, business formation documents, operating agreement or bylaws, stock certificates and ledger (if corporation), proof of 51% women ownership, résumé showing management capability, business lease or deed, bank signature authorization cards, equipment/asset inventory, and evidence of client contracts. The documentation package is nearly identical to MBE — just the eligibility category differs.',
    },
    {
      question: 'Can a business be both MBE and WBE certified by SLDC?',
      answer:
        'Yes — if your business is at least 51% owned and controlled by a woman who is also a minority, you can apply for dual MBE/WBE certification. The application review covers both categories simultaneously. Dual certification maximizes your eligibility for contracts with either MBE or WBE participation goals. However, the ownership and control documentation must satisfy both certification standards — we prepare your package to meet both.',
    },
    {
      question: 'How long does SLDC WBE certification take and what does it cost?',
      answer:
        'SLDC WBE certification typically takes 60–90 days for a complete application. There is no application fee for SLDC certification. Our clients average 45–60 days with a pre-reviewed document package. The process mirrors MBE certification: document submission, analyst review, possible site visit, and final decision. Annual recertification is required with updated financial documents.',
    },
  ],
  sections: [
    {
      title: 'WBE Eligibility Requirements',
      icon: 'check',
      items: [
        { heading: 'Women Ownership (51%+)', text: 'One or more women must own at least 51% of the business. Ownership must be demonstrated through stock certificates, membership interest documentation, or partnership agreements — not merely claimed.' },
        { heading: 'Women Control', text: 'The woman owner(s) must set policy, sign contracts, make financial decisions, and direct management. A male family member or investor running daily operations while the woman owner holds the title will result in denial.' },
        { heading: 'Management and Technical Expertise', text: 'The woman owner must hold the highest position (CEO, President, Managing Member) and demonstrate the education, training, or experience to run the business in its specific industry.' },
        { heading: 'Independence from Male-Owned Firms', text: 'The WBE must not be dependent on a non-woman-owned business for financing, equipment, personnel, or client referrals. Shared office space, shared employees, or commingled finances with a male-owned company are red flags.' },
        { heading: 'Contribution of Capital', text: 'The woman owner(s) must have contributed real, substantial capital to acquire their ownership interest. A token contribution or gift of shares without corresponding investment does not meet the standard.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your SLDC WBE Certification Started',
    text: '15-minute eligibility check. We will confirm your WBE qualification and map out the document package you need.',
    button: 'Check WBE Eligibility',
  },
  relatedPages: [
    { title: 'SLDC MBE Certification', path: '/certifications/sldc-mbe-certification', desc: 'Minority Business Enterprise certification for City of St. Louis contracts.' },
    { title: 'MO OEO MBE/WBE Certification', path: '/mbe-certification-missouri', desc: 'State-level MBE/WBE certification for Missouri state agency contracts.' },
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Federal DBE certification for USDOT-funded transportation contracts.' },
  ],
};

export const moOeoMbeCertification: ProgrammaticPageData = {
  slug: 'certifications/mo-oeo-mbe-certification',
  seo: {
    title: 'Missouri OEO MBE Certification | State-Level Minority Business Enterprise',
    description:
      'Missouri Office of Equal Opportunity (MO OEO) MBE certification guide. State-level minority certification for Missouri state agency contracts. Document checklist, timeline, and how it differs from SLDC city certification.',
    keywords: [
      'Missouri OEO MBE certification',
      'MO OEO minority business',
      'Missouri state MBE certification',
      'MBE Missouri state contracts',
      'Office of Equal Opportunity MBE',
      'Missouri minority business enterprise',
    ],
  },
  hero: {
    eyebrow: 'State-Level · MO OEO',
    title: 'Missouri OEO MBE Certification',
    subtitle:
      'The Missouri Office of Equal Opportunity (MO OEO) certifies minority-owned businesses for state agency contracts. This is separate from SLDC city certification — different agency, different forms, different contract opportunities. Here is what you need to know.',
  },
  faqItems: [
    {
      question: 'What is MO OEO MBE certification and how does it differ from SLDC?',
      answer:
        'MO OEO MBE certification is administered by the Missouri Office of Equal Opportunity for minority-owned businesses seeking Missouri state agency contracts. SLDC MBE is for City of St. Louis contracts only. Key differences: MO OEO uses its own application forms and document standards, evaluates eligibility under state criteria (not SLDC criteria), and grants access to state agency procurement portals including MissouriBUYS. SLDC certification does not automatically transfer to the state level — you need separate certification from each agency for each jurisdiction\'s contracts.',
    },
    {
      question: 'What are the MO OEO MBE eligibility requirements?',
      answer:
        'MO OEO MBE eligibility requires: (1) the business is at least 51% owned by one or more minority individuals who are U.S. citizens or lawful permanent residents; (2) the minority owner(s) control the management and daily operations; (3) the business is a for-profit enterprise physically located in the United States; (4) the minority owner(s) must have technical expertise or experience appropriate to the business; and (5) the business must meet the SBA small business size standard. The OEO reviews ownership and control more rigorously than many applicants expect — operating agreements, board minutes, and management structure all factor into the decision.',
    },
    {
      question: 'What documents are needed for MO OEO MBE certification?',
      answer:
        'The MO OEO MBE certification document package includes: completed MO OEO application, 3 years of personal tax returns for all owners, 3 years of business tax returns, personal financial statement, proof of citizenship/permanent residency, business formation documents (articles of incorporation/organization), operating agreement, stock certificates and ledger, proof of capital contribution by minority owner, résumé of minority owner demonstrating management capability, business lease or deed, bank authorization cards, equipment and asset inventory, evidence of client contracts, and certificate of good standing from the Missouri Secretary of State. The OEO is particularly strict about documentation proving the minority owner actually controls the company.',
    },
  ],
  sections: [
    {
      title: 'MO OEO MBE vs. SLDC MBE: Key Differences',
      icon: 'file',
      items: [
        { heading: 'Administering Agency', text: 'MO OEO = state-level, serves executive branch agencies. SLDC = city-level, serves City of St. Louis departments. Each has its own certification process, forms, and review standards.' },
        { heading: 'Contract Access', text: 'MO OEO opens Missouri state agency contracts (MoDOT, DNR, OA, DSS, etc.). SLDC opens City of St. Louis contracts. They cover different pools of spending — pursuing only one misses the other.' },
        { heading: 'Application Portal', text: 'MO OEO uses its own online application system. SLDC uses the B2GNow vendor portal. You cannot submit one application to cover both — you must complete separate applications.' },
        { heading: 'Document Overlap', text: 'While the underlying documents (tax returns, ownership records, financials) are largely the same, the formatting, submission portal, and specific supplemental forms differ. We prepare both packages simultaneously to save time.' },
        { heading: 'Certification Term', text: 'Both certifications are typically valid for 2–3 years before renewal. Annual reaffirmation may be required to confirm that ownership and control have not changed.' },
        { heading: 'Reciprocity', text: 'There is no automatic reciprocity between SLDC and MO OEO. You must apply separately to each agency. However, having one certification can strengthen your application for the other.' },
      ],
    },
  ],
  cta: {
    title: 'Get Certified at the State Level',
    text: 'Free eligibility review for MO OEO MBE certification. We will identify your document gaps and build your application package.',
    button: 'Start MO OEO Certification',
  },
  relatedPages: [
    { title: 'MO OEO WBE Certification', path: '/certifications/mo-oeo-wbe-certification', desc: 'State-level women business enterprise certification for Missouri contracts.' },
    { title: 'SLDC MBE Certification', path: '/certifications/sldc-mbe-certification', desc: 'City-level minority business certification for St. Louis contracts.' },
    { title: 'MBE Certification Missouri', path: '/mbe-certification-missouri', desc: 'Overview of all Missouri MBE/WBE certification pathways.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service government contract bidding and procurement strategy.' },
  ],
};

export const moOeoWbeCertification: ProgrammaticPageData = {
  slug: 'certifications/mo-oeo-wbe-certification',
  seo: {
    title: 'Missouri OEO WBE Certification | State Women Business Enterprise',
    description:
      'Missouri Office of Equal Opportunity WBE certification for women-owned businesses. State-level certification for Missouri agency contracts. Complete document checklist, eligibility, and application guide.',
    keywords: [
      'Missouri OEO WBE certification',
      'MO OEO women business',
      'Missouri state WBE',
      'women business enterprise Missouri',
      'WBE Missouri state contracts',
      'Office of Equal Opportunity WBE',
    ],
  },
  hero: {
    eyebrow: 'State-Level · MO OEO',
    title: 'Missouri OEO WBE Certification',
    subtitle:
      'The Missouri Office of Equal Opportunity WBE certification opens Missouri state agency contracts to women-owned businesses. Separate from city certification — you need this if you want state contracts.',
  },
  faqItems: [
    {
      question: 'Who qualifies for MO OEO WBE certification?',
      answer:
        'MO OEO WBE certification requires: (1) at least 51% ownership by one or more women who are U.S. citizens or lawful permanent residents; (2) the woman owner(s) must control management and daily operations — not just hold the title; (3) the business must be for-profit and independent; (4) the woman owner(s) must have demonstrated expertise in the business\'s industry; and (5) the business must meet SBA size standards. The OEO evaluates whether the woman owner actually runs the business — interviews and site visits are part of the review.',
    },
    {
      question: 'Can I get both MO OEO WBE and MO OEO MBE simultaneously?',
      answer:
        'Yes — if your business is at least 51% owned and controlled by a woman who is also a minority, you can apply for dual MBE/WBE certification through MO OEO. The application is reviewed for both categories concurrently, and dual certification maximizes your eligibility for state contracts with either MBE or WBE goals. The document requirements are nearly identical — the eligibility categories are what differ. We prepare a single package that satisfies both standards.',
    },
  ],
  sections: [
    {
      title: 'MO OEO WBE Application Requirements',
      icon: 'file',
      items: [
        { heading: 'Completed Application Form', text: 'The MO OEO WBE application form captures ownership structure, management details, business history, and industry classification. Accuracy matters — inconsistencies between the form and supporting documents trigger additional review.' },
        { heading: 'Ownership Documentation', text: 'Articles of incorporation/organization, operating agreement, stock certificates, and capital contribution records that demonstrate 51%+ women ownership. If ownership changed over time, you must document each transfer.' },
        { heading: 'Financial Records', text: '3 years of personal tax returns for each owner, 3 years of business tax returns, and a current personal financial statement. The OEO cross-references income sources to verify that the business is the owner\'s primary professional focus.' },
        { heading: 'Management Proof', text: "The woman owner's résumé, organizational chart, board meeting minutes (if applicable), and evidence of decision-making authority — signed contracts, bank resolutions, and personnel decisions demonstrating actual control." },
        { heading: 'Missouri Presence', text: 'Business location documentation (lease or deed), Missouri Department of Revenue registration, local business license, and proof of economic activity in Missouri.' },
      ],
    },
  ],
  cta: {
    title: 'Start Your MO OEO WBE Certification',
    text: '15-minute call to review your eligibility and map out your certification timeline.',
    button: 'Check WBE Eligibility',
  },
  relatedPages: [
    { title: 'MO OEO MBE Certification', path: '/certifications/mo-oeo-mbe-certification', desc: 'State-level minority business certification for Missouri contracts.' },
    { title: 'SLDC WBE Certification', path: '/certifications/sldc-wbe-certification', desc: 'City-level women business certification for St. Louis contracts.' },
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Federal DBE certification for transportation contracts.' },
  ],
};

export const sba8aCertification: ProgrammaticPageData = {
  slug: 'certifications/sba-8a-certification',
  seo: {
    title: 'SBA 8(a) Certification | Federal Business Development Program',
    description:
      'Complete guide to the SBA 8(a) Business Development Program. Federal certification for socially and economically disadvantaged small businesses. Eligibility, application process, timeline, and what 8(a) unlocks.',
    keywords: [
      'SBA 8(a) certification',
      '8(a) business development',
      'federal small business certification',
      'SBA 8(a) program requirements',
      'how to get 8(a) certified',
      '8(a) set-aside contracts',
      'socially disadvantaged business',
    ],
  },
  hero: {
    eyebrow: 'Federal · SBA',
    title: 'SBA 8(a) Business Development Program',
    subtitle:
      'The SBA 8(a) program is the most powerful federal small business certification. Nine years of eligibility for sole-source contracts, set-asides, and mentorship. But the application is long and the denial rate is high. Here is what it takes to get approved.',
  },
  faqItems: [
    {
      question: 'What is the SBA 8(a) program and what does it get me?',
      answer:
        'The SBA 8(a) Business Development Program is a 9-year federal certification for small businesses owned by socially and economically disadvantaged individuals. Benefits include: access to sole-source contracts (up to $4.5M for goods/services, $7M for manufacturing), competitive set-aside contracts, SBA mentor-protégé program participation, joint venture opportunities with experienced firms, federal surplus property access, and management/technical assistance from SBA district offices. 8(a) firms receive preference on federal contracts across all agencies — not just transportation like DBE.',
    },
    {
      question: 'Who qualifies for SBA 8(a) certification?',
      answer:
        'SBA 8(a) eligibility requires: (1) the business must be at least 51% owned and controlled by one or more socially and economically disadvantaged individuals who are U.S. citizens; (2) the disadvantaged owner(s) must demonstrate personal net worth under $850,000 (excluding primary residence and business ownership); (3) the business must be a small business per SBA size standards; (4) the owner(s) must demonstrate good character and business potential; and (5) the business must have been operational for at least two years (with limited exceptions). Social disadvantage is presumed for certain groups (Black, Hispanic, Native American, Asian Pacific American, Subcontinent Asian American) but must be demonstrated with a narrative for others.',
    },
    {
      question: "What is the social disadvantage narrative and why is it the hardest part?",
      answer:
        'The social disadvantage narrative is a detailed, personal account of specific incidents where you experienced bias or discrimination that affected your entry into or advancement in business. It must be chronological, specific (dates, places, outcomes), and backed by objective evidence where possible. The SBA reviews this for credibility, consistency, and sufficiency. Generic statements like "I faced challenges as a minority" get denied. Successful narratives link specific discriminatory experiences to concrete business impacts — denied loans, lost contracts, exclusion from business networks. This is the most heavily scrutinized section and the #1 denial reason.',
    },
    {
      question: 'How long does SBA 8(a) certification take?',
      answer:
        'SBA 8(a) processing takes 90–120 days from application submission, assuming a complete package. Incomplete applications or those requiring clarification can take 6+ months. The review includes: document verification, personal financial review, social disadvantage narrative evaluation, an on-site visit or virtual interview, and character review (background check on the disadvantaged owner). Prepare for a thorough process — the SBA investigates your claims. We have guided firms through this process and know what triggers additional scrutiny.',
    },
  ],
  sections: [
    {
      title: '8(a) Eligibility Criteria in Detail',
      icon: 'check',
      items: [
        { heading: 'Social Disadvantage', text: "Presumed for Black, Hispanic, Native American, Asian Pacific, and Subcontinent Asian Americans. Others must prove social disadvantage through a detailed narrative with objective evidence of chronic, substantial discrimination tied to business impact." },
        { heading: 'Economic Disadvantage', text: "Personal net worth under $850,000 (excluding primary residence and business equity). Adjusted gross income under $400,000 (averaged over 3 years). Total assets under $6.5M. The SBA calculates all three — exceeding any threshold disqualifies you." },
        { heading: 'Ownership & Control', text: '51%+ unconditional ownership by disadvantaged individual(s). Disadvantaged owner must hold the highest position, make day-to-day decisions, and demonstrate management experience. A non-disadvantaged family member in operational control = automatic denial.' },
        { heading: 'Two-Year Rule', text: 'Business must have been operational for at least two full years before application, demonstrated through tax returns showing revenue generation. Waivers are available for businesses with exceptional potential but require stronger documentation.' },
        { heading: 'Good Character', text: 'The disadvantaged owner(s) must demonstrate good character — no felony convictions, no debarment from federal contracting, truthful financial disclosures. Background checks are part of the review.' },
        { heading: 'Potential for Success', text: 'The business must demonstrate it can successfully perform federal contracts. At least one completed contract, capable management, and adequate financial resources are expected. Startups with no track record face a higher burden of proof.' },
      ],
    },
  ],
  cta: {
    title: 'Is Your Business 8(a) Ready?',
    text: 'We will review your eligibility, calculate your net worth, and map your narrative. Free 15-minute assessment.',
    button: 'Check 8(a) Eligibility',
  },
  relatedPages: [
    { title: 'WOSB/EDWOSB Certification', path: '/certifications/wosb-certification', desc: 'Women-Owned Small Business federal certification for set-aside contracts.' },
    { title: 'HUBZone Certification', path: '/certifications/hubzone-certification', desc: 'Historically Underutilized Business Zone federal certification.' },
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Federal DBE certification for transportation contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service federal bid support and procurement strategy.' },
  ],
};

export const wosbCertification: ProgrammaticPageData = {
  slug: 'certifications/wosb-certification',
  seo: {
    title: 'WOSB / EDWOSB Certification | Women-Owned Small Business Federal Program',
    description:
      'WOSB and EDWOSB federal certification for women-owned small businesses. SBA program for set-aside contracts in underrepresented industries. Eligibility, application, and when EDWOSB matters.',
    keywords: [
      'WOSB certification',
      'EDWOSB certification',
      'women owned small business federal',
      'SBA WOSB program',
      'WOSB set-aside contracts',
      'economically disadvantaged WOSB',
      'women federal contracting',
    ],
  },
  hero: {
    eyebrow: 'Federal · SBA',
    title: 'WOSB / EDWOSB Federal Certification',
    subtitle:
      'The SBA WOSB (Women-Owned Small Business) program sets aside federal contracts specifically for women-owned firms in industries where women are underrepresented. EDWOSB adds an economic disadvantage component. Here is how it works and how to qualify.',
  },
  faqItems: [
    {
      question: 'What is the difference between WOSB and EDWOSB?',
      answer:
        'WOSB (Women-Owned Small Business) certification qualifies your firm for set-aside contracts in designated NAICS code industries where women are underrepresented. EDWOSB (Economically Disadvantaged WOSB) is a sub-category for women who also demonstrate economic disadvantage — personal net worth under $850,000, adjusted gross income under $400,000, and total assets under $6.5M. EDWOSB-certified firms can compete for additional set-aside contracts reserved specifically for economically disadvantaged women-owned businesses. If the woman owner meets the economic disadvantage thresholds, pursuing EDWOSB instead of just WOSB maximizes eligible contract opportunities.',
    },
    {
      question: 'How do I get WOSB/EDWOSB certified?',
      answer:
        'There are two paths to WOSB/EDWOSB certification: (1) Self-certification through SAM.gov — you upload your documents to the SBA certify.SBA.gov portal and self-represent as WOSB/EDWOSB eligible. (2) Third-party certification through an SBA-approved certifier. As of 2024, the SBA requires formal certification through certify.SBA.gov for all WOSB/EDWOSB set-aside contracts. Self-certification alone no longer qualifies you for set-asides. The application includes ownership documentation, tax returns, personal financial statements, proof of citizenship, and for EDWOSB — a detailed economic disadvantage narrative.',
    },
  ],
  sections: [
    {
      title: 'WOSB Eligibility Requirements',
      icon: 'check',
      items: [
        { heading: 'Women Ownership (51%+)', text: 'At least 51% unconditionally and directly owned by one or more women who are U.S. citizens. The woman owner(s) must demonstrate active participation in day-to-day management.' },
        { heading: 'Women Control', text: 'Women must control the long-term decision-making, day-to-day operations, and hold the highest officer position in the company. The board of directors (if applicable) must include women members.' },
        { heading: 'SBA Size Standards', text: 'The business must qualify as a small business under the SBA size standard for its primary NAICS code. Check your NAICS code against the current SBA size table — some industries have employee caps, others revenue caps.' },
        { heading: 'EDWOSB Economic Thresholds', text: 'If applying as EDWOSB, the woman owner must demonstrate: personal net worth under $850,000 (excluding primary residence and business equity), AGI under $400,000 (3-year average), and total assets under $6.5M.' },
      ],
    },
  ],
  cta: {
    title: 'Get Your WOSB/EDWOSB Certification',
    text: 'We will determine if you qualify for WOSB, EDWOSB, or both — and prepare your certification package.',
    button: 'Check WOSB Eligibility',
  },
  relatedPages: [
    { title: 'SBA 8(a) Certification', path: '/certifications/sba-8a-certification', desc: 'Federal 8(a) program for socially and economically disadvantaged businesses.' },
    { title: 'HUBZone Certification', path: '/certifications/hubzone-certification', desc: 'Federal HUBZone program for businesses in historically underutilized areas.' },
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Federal DBE certification for transportation contracts.' },
  ],
};

export const sdvosbCertification: ProgrammaticPageData = {
  slug: 'certifications/sdvosb-certification',
  seo: {
    title: 'SDVOSB Certification | Service-Disabled Veteran-Owned Small Business',
    description:
      'SDVOSB certification for service-disabled veteran-owned small businesses. Federal sole-source and set-aside contracts. VA Vets First program requirements and SBA certification process.',
    keywords: [
      'SDVOSB certification',
      'service disabled veteran owned business',
      'veteran federal contracts',
      'SDVOSB set-aside',
      'VA Vets First program',
      'veteran business certification',
    ],
  },
  hero: {
    eyebrow: 'Federal · SBA / VA',
    title: 'SDVOSB Certification',
    subtitle:
      'Service-Disabled Veteran-Owned Small Business certification unlocks federal sole-source contracts and set-asides. The VA has its own verification program (Vets First). Here is the certification pathway and what you need to qualify.',
  },
  faqItems: [
    {
      question: 'What is SDVOSB certification and what does it give me?',
      answer:
        'SDVOSB certification qualifies your firm for federal contracts specifically set aside for service-disabled veteran-owned small businesses. The federal government has an annual goal of awarding at least 3% of all federal prime contracting dollars to SDVOSBs — billions in potential contracts. Benefits include: sole-source contracts (up to $5M for manufacturing, $4M for other), competitive set-asides, and priority consideration within the VA\'s Vets First program. The VA alone is the second-largest federal procurement agency and has mandatory SDVOSB set-aside requirements under the "Veterans First" contracting program.',
    },
    {
      question: 'How do I prove service-disabled veteran status?',
      answer:
        'You must provide: (1) DD Form 214 showing honorable discharge; (2) VA disability rating letter establishing at least 0% service-connected disability (any rating qualifies, including 0%); and (3) for the VA\'s Vets First program, VA verification through the Vendor Information Pages (VIP) portal. The disability must be service-connected — a VA rating decision letter is the definitive evidence. If your disability rating is pending, your certification application will be on hold until the VA issues its determination.',
    },
    {
      question: 'What is the difference between SBA SDVOSB and VA Vets First verification?',
      answer:
        'The SBA certifies SDVOSB status for all federal agencies — this is through certify.SBA.gov. The VA has an additional verification program called Vets First (VA VIP) that is required specifically for VA contracts. As of 2023, the SBA handles SDVOSB certification for both the SBA and VA through a unified portal. Previously, self-certification was allowed; now, formal SBA certification is required for all SDVOSB set-aside contracts. The documentation requirements are similar but the VA may request additional verification specific to Vets First.',
    },
  ],
  sections: [
    {
      title: 'SDVOSB Eligibility Criteria',
      icon: 'check',
      items: [
        { heading: 'Veteran Status', text: 'At least 51% owned by one or more service-disabled veterans with an honorable discharge. VA disability rating letter (any percentage, including 0%) is required to document the service-connected disability.' },
        { heading: 'Control', text: "The service-disabled veteran owner(s) must control day-to-day operations, hold the highest officer position, and make long-term decisions. A non-veteran manager running daily operations will result in denial." },
        { heading: 'Full-Time Requirement', text: 'The service-disabled veteran owner with the highest ownership must work full-time in the business during normal working hours. Part-time or passive ownership does not qualify. For the VA Vets First program, this requirement is strictly enforced.' },
        { heading: 'SBA Size Standards', text: 'The business must be small under the SBA size standard for its primary NAICS code. The SDVOSB must perform the primary work on any contract — excessive subcontracting to non-SDVOSB firms can jeopardize your certification.' },
        { heading: 'Unconditional Ownership', text: 'Ownership must be direct and unconditional — not through a trust, holding company, or other intermediary. Any ownership restrictions (options, convertible debt held by non-veterans) must be disclosed and may affect eligibility.' },
      ],
    },
  ],
  cta: {
    title: 'Get SDVOSB Certified',
    text: 'We will verify your eligibility and prepare your certification package. Free 15-minute consultation.',
    button: 'Check SDVOSB Eligibility',
  },
  relatedPages: [
    { title: 'SBA 8(a) Certification', path: '/certifications/sba-8a-certification', desc: 'Federal 8(a) program for socially and economically disadvantaged businesses.' },
    { title: 'WOSB/EDWOSB Certification', path: '/certifications/wosb-certification', desc: 'Women-Owned Small Business federal certification.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service federal procurement and bid support.' },
  ],
};

export const hubzoneCertification: ProgrammaticPageData = {
  slug: 'certifications/hubzone-certification',
  seo: {
    title: 'HUBZone Certification | Historically Underutilized Business Zone Program',
    description:
      'HUBZone certification for businesses in historically underutilized business zones. Federal program with 3% contracting goal. Eligibility based on location and workforce. SBA HUBZone map and application guide.',
    keywords: [
      'HUBZone certification',
      'historically underutilized business zone',
      'SBA HUBZone program',
      'HUBZone map Missouri',
      'HUBZone St. Louis',
      'federal HUBZone contracts',
    ],
  },
  hero: {
    eyebrow: 'Federal · SBA',
    title: 'HUBZone Certification',
    subtitle:
      'The HUBZone (Historically Underutilized Business Zone) program targets federal contracts to businesses in economically distressed areas. If your business is located in a designated HUBZone and employs HUBZone residents, you may qualify for set-aside and sole-source contracts.',
  },
  faqItems: [
    {
      question: 'What is a HUBZone and is my business in one?',
      answer:
        'A HUBZone is a census tract or qualified area designated by the SBA as historically underutilized. Areas qualify based on low median household income, high unemployment, or location on an Indian reservation or military base closed under BRAC. You can check whether your business address is in a HUBZone using the SBA\'s HUBZone map tool online. Portions of North St. Louis City, East St. Louis, and certain rural Missouri counties are designated HUBZones. If your principal office is in a qualified area, you may meet the location requirement.',
    },
    {
      question: 'What are the HUBZone certification requirements?',
      answer:
        'HUBZone certification requires: (1) the business\'s principal office must be located in a designated HUBZone; (2) at least 35% of the business\'s employees must reside in a HUBZone (any HUBZone, not necessarily the one where your office is located); (3) the business must be at least 51% owned and controlled by U.S. citizens, a Community Development Corporation, an agricultural cooperative, an Alaska Native Corporation, or a Native Hawaiian Organization; and (4) the business must meet SBA small business size standards. The 35% employee residency requirement is monitored through annual recertification — you must maintain HUBZone employee residency throughout your certification term.',
    },
  ],
  sections: [
    {
      title: 'HUBZone Eligibility Checklist',
      icon: 'check',
      items: [
        { heading: 'Principal Office Location', text: 'Must be in a SBA-designated HUBZone. The principal office is where the greatest number of employees perform work — not just a mailing address. Home-based businesses must demonstrate the home office is the principal work location.' },
        { heading: '35% Employee Residency', text: 'At least 35% of total employees must live in any HUBZone. Count all employees (full-time and part-time equivalents). Maintain residency documentation — employee addresses, lease agreements, or utility bills showing HUBZone residence.' },
        { heading: 'Ownership & Control', text: '51%+ owned by U.S. citizens, CDC, agricultural cooperative, Alaska Native Corporation, or Native Hawaiian Organization. The qualifying owner(s) must control management and daily operations.' },
        { heading: 'Annual Recertification', text: 'HUBZone certification requires annual recertification with updated employee residency documentation. The SBA conducts program examinations — unannounced site visits to verify location and workforce requirements are real.' },
      ],
    },
  ],
  cta: {
    title: 'Is Your Business in a HUBZone?',
    text: 'We will check your location and help you understand if HUBZone certification applies. Free assessment.',
    button: 'Check HUBZone Status',
  },
  relatedPages: [
    { title: 'SBA 8(a) Certification', path: '/certifications/sba-8a-certification', desc: 'Federal 8(a) program for disadvantaged businesses.' },
    { title: 'SDVOSB Certification', path: '/certifications/sdvosb-certification', desc: 'Service-disabled veteran-owned business federal certification.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service federal procurement and bid strategy.' },
  ],
};

export const stlCountyMbeCertification: ProgrammaticPageData = {
  slug: 'certifications/st-louis-county-mbe-certification',
  seo: {
    title: 'St. Louis County MBE Certification | County Minority Business Enterprise',
    description:
      'St. Louis County MBE certification for county contracts and procurement. Eligibility, document requirements, and how St. Louis County M/WBE certification differs from SLDC city certification.',
    keywords: [
      'St. Louis County MBE certification',
      'St. Louis County minority business',
      'county M/WBE certification',
      'St. Louis County procurement',
      'county minority business enterprise',
      'St. Louis County contracts',
    ],
  },
  hero: {
    eyebrow: 'County-Level · St. Louis County',
    title: 'St. Louis County MBE/WBE Certification',
    subtitle:
      'St. Louis County has its own M/WBE certification distinct from SLDC city certification. County government is a major buyer of construction, professional services, and goods — here is how to get certified and access those contracts.',
  },
  faqItems: [
    {
      question: 'Does St. Louis County have its own MBE certification?',
      answer:
        'Yes — St. Louis County administers its own Minority and Women-Owned Business Enterprise (M/WBE) certification program through the County\'s Department of Human Services or Office of Diversity, Equity and Inclusion. It is separate from SLDC (City of St. Louis) certification and MO OEO (state) certification. County certification qualifies your firm for St. Louis County government contracts with M/WBE participation goals. County projects span public works, infrastructure, professional services, and supplies procurement — a different contract pool from city or state.',
    },
    {
      question: 'How is St. Louis County M/WBE different from SLDC M/WBE?',
      answer:
        'While both certify minority and women-owned businesses, they serve different jurisdictions: SLDC covers City of St. Louis contracts; St. Louis County covers County government contracts only. The County has its own application, review process, procurement portal, and compliance reporting. Geographic eligibility for SLDC requires City economic presence; the County similarly expects businesses to demonstrate economic activity in St. Louis County. Many firms pursue both certifications to access both contract pools.',
    },
    {
      question: 'What are the St. Louis County M/WBE certification requirements?',
      answer:
        'St. Louis County M/WBE certification requires: at least 51% ownership by minority and/or women individuals who are U.S. citizens or permanent residents; operational control by the qualifying owners; an established business presence in St. Louis County (or demonstrated economic activity); SBA small business size compliance; and submission of ownership documentation, tax returns, financial statements, and proof of management control. Contact the County procurement office for the current application — the program details can shift with county administration changes. We stay current on program requirements and prepare your package.',
    },
  ],
  sections: [
    {
      title: 'County Certification at a Glance',
      icon: 'file',
      items: [
        { heading: 'County Agency', text: 'St. Louis County Department of Human Services or Office of Diversity, Equity and Inclusion administers the M/WBE program. Contact them directly for current forms, or we handle it on your behalf.' },
        { heading: 'County Contract Types', text: 'County contracts include: public works (road maintenance, park improvements, building renovations), professional services (engineering, legal, IT, consulting), and goods/supplies procurement. County spending on M/WBE-eligible contracts is substantial.' },
        { heading: 'Document Overlap with SLDC', text: 'The core documents mirror SLDC requirements — tax returns, ownership records, management profiles, lease agreement. Coordinated preparation for both certifications saves significant time and eliminates duplicate effort.' },
        { heading: 'Renewal & Maintenance', text: 'County certification typically requires periodic renewal. Keep your documentation current — tax returns, ownership records, and contact information must be updated with the County at each renewal cycle.' },
      ],
    },
  ],
  cta: {
    title: 'Get St. Louis County M/WBE Certified',
    text: 'We will check County requirements and prepare your application package. Free 15-minute consultation.',
    button: 'Start County Certification',
  },
  relatedPages: [
    { title: 'SLDC MBE Certification', path: '/certifications/sldc-mbe-certification', desc: 'City-level minority business certification for St. Louis City contracts.' },
    { title: 'MO OEO MBE Certification', path: '/certifications/mo-oeo-mbe-certification', desc: 'State-level minority business certification for Missouri agency contracts.' },
    { title: 'MWBE Certification St. Louis', path: '/st-louis/mwbe-certification-assistance', desc: 'Full MWBE certification assistance across all jurisdictions.' },
  ],
};

export const metroBiStateDbeCertification: ProgrammaticPageData = {
  slug: 'certifications/metro-bi-state-dbe-certification',
  seo: {
    title: 'Metro/Bi-State DBE Certification | Transit Disadvantaged Business Enterprise',
    description:
      'Metro Transit / Bi-State Development DBE certification for St. Louis transit contracts. FTA-funded projects with DBE participation goals. Application process and how it relates to MODOT DBE.',
    keywords: [
      'Metro DBE certification',
      'Bi-State DBE',
      'Metro Transit DBE St. Louis',
      'FTA DBE certification',
      'transit disadvantaged business',
      'St. Louis Metro contracts',
    ],
  },
  hero: {
    eyebrow: 'Transit · Metro/Bi-State',
    title: 'Metro/Bi-State DBE Certification',
    subtitle:
      'Metro Transit (Bi-State Development Agency) administers its own DBE program for FTA-funded transit contracts in the St. Louis region. If you want to work on MetroLink, MetroBus, or Metro facility projects, this certification is your entry point.',
  },
  faqItems: [
    {
      question: 'What is Metro/Bi-State DBE certification?',
      answer:
        'Metro/Bi-State DBE certification is the Disadvantaged Business Enterprise program administered by Bi-State Development Agency (Metro Transit) for Federal Transit Administration (FTA)-funded projects. It follows the same federal DBE regulations (49 CFR Part 26) as MODOT DBE but is administered through Metro rather than the state DOT. Metro contracts include: MetroLink light rail construction and maintenance, MetroBus fleet and facility projects, transit center construction, and professional services supporting transit operations. DBE goals apply to all FTA-funded Metro contracts.',
    },
    {
      question: 'If I have MODOT DBE, do I also need Metro DBE?',
      answer:
        'MODOT DBE and Metro DBE are administered separately. However, under federal DBE rules (49 CFR Part 26), DBE certification by one recipient in a state is generally recognized by others. In practice, Metro often accepts MODOT DBE certification for its FTA projects without requiring a separate application — this is called interstate/interagency reciprocity. Check with Metro\'s DBE liaison office for their current reciprocity policy. If reciprocity applies, your MODOT DBE certification may suffice for Metro contracts. If not, a separate application with Metro is required.',
    },
  ],
  sections: [
    {
      title: 'Metro DBE Program Details',
      icon: 'file',
      items: [
        { heading: 'Administering Agency', text: 'Bi-State Development Agency (Metro Transit) DBE Office. Contact Metro\'s procurement department for the current DBE application and program requirements.' },
        { heading: 'Contract Types', text: 'MetroLink construction and rehabilitation, MetroBus maintenance facilities, transit center development, engineering and design contracts, IT and professional services for transit systems.' },
        { heading: 'Reciprocity with MODOT', text: 'Under 49 CFR Part 26, DBE certification reciprocity generally applies. Metro typically recognizes MODOT DBE certification — confirm current policy with Metro\'s DBE office before applying separately.' },
        { heading: 'DBE Goal on FTA Contracts', text: 'FTA-funded Metro contracts carry DBE participation goals similar to MODOT highway projects. Primes bidding on Metro work actively seek certified DBE subcontractors.' },
      ],
    },
  ],
  cta: {
    title: 'Navigate Metro DBE Certification',
    text: 'We will determine if you need a separate Metro DBE application or if reciprocity applies. Free 15-minute review.',
    button: 'Check Metro DBE Status',
  },
  relatedPages: [
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Complete MODOT DBE certification guide and application assistance.' },
    { title: 'ACDBE Certification', path: '/certifications/acdbe-certification', desc: 'Airport Concession DBE certification for Lambert Airport.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service federal and local bid support and strategy.' },
  ],
};

export const acdbeCertification: ProgrammaticPageData = {
  slug: 'certifications/acdbe-certification',
  seo: {
    title: 'ACDBE Certification | Airport Concession Disadvantaged Business Enterprise',
    description:
      'ACDBE certification for Lambert St. Louis International Airport concessions. FAA-mandated DBE program for airport food, retail, rental car, and service concessions. Eligibility and application guide.',
    keywords: [
      'ACDBE certification',
      'airport concession DBE',
      'Lambert airport DBE',
      'FAA ACDBE program',
      'St. Louis airport concessions',
      'airport DBE certification',
    ],
  },
  hero: {
    eyebrow: 'Aviation · FAA ACDBE',
    title: 'ACDBE Certification — Airport Concession DBE',
    subtitle:
      'Lambert St. Louis International Airport has FAA-mandated ACDBE participation goals for airport concessions — food courts, retail shops, rental car operations, and advertising. ACDBE certification is separate from DBE and applies specifically to concession businesses at commercial service airports.',
  },
  faqItems: [
    {
      question: 'What is ACDBE and who needs it?',
      answer:
        'ACDBE (Airport Concession Disadvantaged Business Enterprise) is a federal certification for disadvantaged businesses providing concessions at commercial service airports. Concessions include: food and beverage operations, retail stores, newsstands, duty-free shops, rental car companies, advertising companies, parking management, and passenger services. Lambert Airport (STL) receives FAA Airport Improvement Program funding and is required to have an ACDBE program with participation goals. If you want to operate a concession at Lambert, you need ACDBE certification specifically — standard DBE does not cover airport concessions.',
    },
    {
      question: 'How is ACDBE different from standard DBE?',
      answer:
        'ACDBE and DBE share the same eligibility framework (49 CFR Part 26) — social and economic disadvantage, personal net worth cap of $1.32M, 51% ownership and control. The key difference is scope: DBE applies to construction, professional services, and goods on DOT-funded projects. ACDBE applies specifically to concession operations at airports — a different business model with different evaluation criteria. ACDBE also has unique requirements around concession-specific experience, operational capability in an airport environment, and compliance with airport lease and operating standards. A firm can be DBE-certified, ACDBE-certified, or both.',
    },
  ],
  sections: [
    {
      title: 'ACDBE Eligibility & Application',
      icon: 'check',
      items: [
        { heading: 'Same Core DBE Criteria', text: '51% ownership by socially and economically disadvantaged individual(s), personal net worth under $1.32M, operational control, and SBA size standards. The foundational eligibility is identical to DBE.' },
        { heading: 'Concession-Specific Requirements', text: 'Must demonstrate capability to operate the specific type of concession — food service experience for a restaurant concession, retail experience for a store, rental car industry experience, etc. Airport concessions have unique operational demands.' },
        { heading: 'Lambert Airport Application', text: 'ACDBE certification is administered through the airport sponsor (City of St. Louis Airport Authority / Lambert). Contact Lambert\'s ACDBE liaison for the current application package and concession opportunity listings.' },
        { heading: 'Concession Opportunities', text: 'Lambert issues RFPs for concession spaces periodically. ACDBE certification makes you eligible for set-aside concession spaces and gives you an advantage in competitive concession awards. Food and beverage concessions are the most frequently available.' },
      ],
    },
  ],
  cta: {
    title: 'Pursue an Airport Concession?',
    text: 'We will assess your ACDBE eligibility and guide you through the certification path. Free 15-minute review.',
    button: 'Check ACDBE Eligibility',
  },
  relatedPages: [
    { title: 'MODOT DBE Certification', path: '/dbe-certification-missouri', desc: 'Complete MODOT DBE certification for transportation construction and services.' },
    { title: 'Metro/Bi-State DBE', path: '/certifications/metro-bi-state-dbe-certification', desc: 'DBE certification for Metro Transit contracts.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full-service procurement and bid strategy support.' },
  ],
};

export const msdDiversityProgram: ProgrammaticPageData = {
  slug: 'certifications/msd-diversity-program',
  seo: {
    title: 'MSD Supplier Diversity Program | Metropolitan St. Louis Sewer District M/WBE',
    description:
      'MSD (Metropolitan St. Louis Sewer District) supplier diversity program for M/WBE-certified firms. How to register as a diverse supplier for MSD construction, engineering, and services contracts.',
    keywords: [
      'MSD diversity program',
      'MSD M/WBE St. Louis',
      'Metropolitan Sewer District supplier diversity',
      'MSD small business program',
      'sewer district contracts St. Louis',
      'MSD MBE WBE certification',
    ],
  },
  hero: {
    eyebrow: 'Utility · MSD',
    title: 'MSD Supplier Diversity Program',
    subtitle:
      'The Metropolitan St. Louis Sewer District (MSD) spends hundreds of millions on infrastructure — treatment plants, sewer mains, engineering, and environmental services — and has a supplier diversity program for M/WBE firms. Here is how to register and bid on MSD contracts.',
  },
  faqItems: [
    {
      question: 'What is the MSD Supplier Diversity Program?',
      answer:
        'MSD Project Clear (Metropolitan St. Louis Sewer District) maintains a Supplier Diversity Program to increase M/WBE participation on MSD construction, professional services, and goods contracts. MSD is under a federal consent decree requiring billions in infrastructure upgrades over 20+ years — creating sustained contracting opportunities for diverse firms. The program accepts SLDC, MO OEO, and other recognized M/WBE certifications and encourages primes to subcontract with diverse firms. MSD tracks M/WBE participation on its contracts and publishes annual diversity spend reports.',
    },
    {
      question: 'How do I register as an M/WBE supplier with MSD?',
      answer:
        'To register as an M/WBE supplier with MSD: (1) obtain M/WBE certification through SLDC, MO OEO, or another recognized certifying agency; (2) register in MSD\'s vendor portal and indicate your diverse business status; (3) upload your certification letter(s) to your vendor profile; (4) monitor MSD\'s procurement page for solicitations in your industry; (5) attend MSD pre-bid meetings and supplier outreach events to connect with prime contractors and MSD procurement staff. MSD holds regular outreach events specifically for diverse suppliers.',
    },
  ],
  sections: [
    {
      title: 'MSD Contracting at a Glance',
      icon: 'file',
      items: [
        { heading: 'MSD Construction', text: 'Wastewater treatment plant upgrades, sewer main replacement/rehabilitation, stormwater infrastructure, and pump station construction. MSD\'s capital improvement program exceeds $6 billion over 20 years.' },
        { heading: 'Professional Services', text: 'Engineering design, environmental consulting, surveying, construction management, and IT services. MSD contracts with firms of all sizes — from large engineering primes to specialized small-business subcontractors.' },
        { heading: 'Goods & Supplies', text: 'Pipes, valves, treatment chemicals, safety equipment, vehicles, and office supplies. MSD maintains vendor lists and issues purchase orders for recurring supply needs.' },
        { heading: 'Certification Acceptance', text: 'MSD generally accepts M/WBE certifications from SLDC, MO OEO, and other recognized agencies. You do not need a separate MSD-specific certification — just register your existing certification in their vendor portal.' },
      ],
    },
  ],
  cta: {
    title: 'Get Registered With MSD',
    text: 'We will help you register as an M/WBE vendor, prepare capability statements for MSD contracts, and connect you with primes on MSD projects.',
    button: 'Register With MSD',
  },
  relatedPages: [
    { title: 'SLDC MBE Certification', path: '/certifications/sldc-mbe-certification', desc: 'City-level MBE certification accepted by MSD for vendor registration.' },
    { title: 'MO OEO MBE Certification', path: '/certifications/mo-oeo-mbe-certification', desc: 'State-level MBE certification for Missouri agency contracts including MSD.' },
    { title: 'Government Contracting Consultant', path: '/government-contracting-consultant-st-louis', desc: 'Full bid preparation and procurement strategy for local government contracts.' },
  ],
};

// ── Aliases for backwards-compatible imports ─────────────────────────────
export const federal8aCertification = sba8aCertification;
export const metroBiStateCertification = metroBiStateDbeCertification;
export const msdDiversityCertification = msdDiversityProgram;
export const moOeoMbeWbeCertification = moOeoMbeCertification;
export const modotDbeCertification = metroBiStateDbeCertification;