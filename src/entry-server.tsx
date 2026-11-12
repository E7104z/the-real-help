/**
 * Data-driven SSR entry point — NO React rendering.
 *
 * react-helmet-async v3 disabled SSR context support for React 19.
 * Instead, we export a static meta map built directly from the data files.
 * The prerender script reads this map and injects correct <head> tags into
 * per-route HTML files at build time.
 */

import {
  sldcMbeCertification,
  sldcWbeCertification,
  moOeoMbeCertification,
  metroBiStateDbeCertification,
  sba8aCertification,
  wosbCertification,
  sdvosbCertification,
  hubzoneCertification,
  stlCountyMbeCertification,
  acdbeCertification,
  msdDiversityProgram,
} from './data/seo/certificationPages';
import { mbeSupplierVsSubcontractor } from './data/seo/contractPages';

// ── Types ────────────────────────────────────────────────────────────────

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  faqSchema?: object;
}

// ── Helper: build FAQ JSON-LD ────────────────────────────────────────────

function buildFaq(items: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

// ── Meta map ─────────────────────────────────────────────────────────────

export const META: Record<string, RouteMeta> = {
  '/': {
    title: 'Business Consultant St. Louis | The Real Help, LLC',
    description:
      'St. Louis business consultant specializing in MWBE certification, Medicaid CDS compliance, web app development, and AI automation. Real results, real fast.',
    canonical: 'https://therealhelp.com/',
  },
  '/about': {
    title: 'About | The Real Help, LLC — St. Louis Business Consulting',
    description:
      'The Real Help, LLC is a St. Louis-based consulting firm delivering MWBE certification, CDS compliance, web apps, and AI automation for small businesses.',
    canonical: 'https://therealhelp.com/about',
  },
  '/work': {
    title: 'Our Work | The Real Help, LLC — Results & Case Studies',
    description:
      'See what The Real Help, LLC has built for St. Louis small businesses: web apps, compliance systems, certifications, and automation workflows.',
    canonical: 'https://therealhelp.com/work',
  },
  '/property-transfer': {
    title: 'Property Transfer Assistance | The Real Help, LLC',
    description:
      'Property transfer consulting and documentation support in St. Louis. Streamline your transfer with expert guidance from The Real Help, LLC.',
    canonical: 'https://therealhelp.com/property-transfer',
  },
  '/st-louis/web-app-development': {
    title: 'Web App Development St. Louis | The Real Help, LLC',
    description:
      'Affordable web app development in St. Louis. Custom portals, scheduling tools, client dashboards, and full-stack applications built fast by The Real Help, LLC.',
    canonical: 'https://therealhelp.com/st-louis/web-app-development',
    keywords: ['web app development St. Louis', 'custom web application St. Louis', 'client portal St. Louis'],
  },
  '/missouri/cds-compliance-consulting': {
    title: 'CDS EVV Compliance Missouri | The Real Help, LLC',
    description:
      'Missouri CDS agency compliance consulting. EVV alignment, billing reconciliation, audit prep, and documentation systems for Consumer-Directed Services providers.',
    canonical: 'https://therealhelp.com/missouri/cds-compliance-consulting',
    keywords: ['CDS compliance Missouri', 'EVV compliance Missouri', 'CDS agency Missouri'],
  },
  '/st-louis/mwbe-certification-assistance': {
    title: 'MWBE Certification St. Louis | The Real Help, LLC',
    description:
      'Get MWBE certified in St. Louis with expert guidance. The Real Help, LLC handles MBE, WBE, and DBE certification applications from start to approval.',
    canonical: 'https://therealhelp.com/st-louis/mwbe-certification-assistance',
    keywords: ['MWBE certification St. Louis', 'MBE certification St. Louis', 'WBE certification St. Louis'],
  },
  '/st-louis/business-consultant': {
    title: 'Business Consultant St. Louis | The Real Help, LLC',
    description:
      'Looking for a business consultant in St. Louis? The Real Help, LLC delivers real results in compliance, operations, tech, and growth. No fluff, no retainers.',
    canonical: 'https://therealhelp.com/st-louis/business-consultant',
    keywords: ['business consultant St. Louis', 'small business consultant St. Louis'],
  },
  '/government-contracting-consultant-st-louis': {
    title: 'Government Contracting Consultant St. Louis | Bid & Certification Help',
    description:
      'Government contracting consultant in St. Louis helping small businesses bid on city, state, and federal contracts. MBE/DBE certification strategy, capability statements, B2GNow navigation, and prime contractor positioning.',
    canonical: 'https://therealhelp.com/government-contracting-consultant-st-louis',
    keywords: ['government contracting consultant St. Louis', 'government contract bidding Missouri', 'MBE subcontractor St. Louis'],
  },
  '/dbe-certification-missouri': {
    title: 'DBE Certification Missouri | MODOT, ACDBE & Metro DBE Consultant',
    description:
      'Expert DBE certification assistance in Missouri. MODOT DBE, ACDBE (airport), and Metro/Bi-State DBE certification. Personal net worth, social disadvantage narrative, and document preparation.',
    canonical: 'https://therealhelp.com/dbe-certification-missouri',
    keywords: ['DBE certification Missouri', 'MODOT DBE certification', 'disadvantaged business enterprise Missouri'],
  },
  '/mbe-certification-missouri': {
    title: 'MBE Certification Missouri | MO OEO MBE/WBE State Certification Help',
    description:
      'Missouri MBE certification consulting for MO OEO, SLDC, and state-level programs. Expert guidance through the application process, document preparation, and certification strategy.',
    canonical: 'https://therealhelp.com/mbe-certification-missouri',
    keywords: ['MBE certification Missouri', 'MO OEO MBE', 'minority business certification Missouri'],
  },
  '/start-a-cds-agency-missouri': {
    title: 'Start a CDS Agency in Missouri | DSDS, DMH & EVV Startup Guide',
    description:
      'Complete guide to starting a Consumer-Directed Services (CDS) agency in Missouri. DSDS enrollment, EVV setup, billing systems, and compliance from day one.',
    canonical: 'https://therealhelp.com/start-a-cds-agency-missouri',
    keywords: ['start CDS agency Missouri', 'Consumer Directed Services Missouri', 'DSDS enrollment Missouri'],
  },
  '/st-louis/government-contracting-consultant': {
    title: 'Government Contracting Consultant St. Louis | Bid & Certification Help',
    description: 'Government contracting consultant in St. Louis helping small businesses bid on city, state, and federal contracts.',
    canonical: 'https://therealhelp.com/government-contracting-consultant-st-louis',
  },
  '/missouri/dbe-certification': {
    title: 'DBE Certification Missouri | MODOT, ACDBE & Metro DBE Consultant',
    description: 'Expert DBE certification assistance in Missouri.',
    canonical: 'https://therealhelp.com/dbe-certification-missouri',
  },
  '/missouri/mbe-certification': {
    title: 'MBE Certification Missouri | MO OEO MBE/WBE State Certification Help',
    description: 'Missouri MBE certification consulting for MO OEO, SLDC, and state-level programs.',
    canonical: 'https://therealhelp.com/mbe-certification-missouri',
  },
  '/missouri/start-a-cds-agency': {
    title: 'Start a CDS Agency in Missouri | DSDS, DMH & EVV Startup Guide',
    description: 'Complete guide to starting a Consumer-Directed Services (CDS) agency in Missouri.',
    canonical: 'https://therealhelp.com/start-a-cds-agency-missouri',
  },
  '/certifications/sldc-mbe-certification': {
    title: sldcMbeCertification.seo.title,
    description: sldcMbeCertification.seo.description,
    canonical: `https://therealhelp.com/${sldcMbeCertification.slug}`,
    keywords: sldcMbeCertification.seo.keywords,
    faqSchema: buildFaq(sldcMbeCertification.faqItems),
  },
  '/certifications/sldc-wbe-certification': {
    title: sldcWbeCertification.seo.title,
    description: sldcWbeCertification.seo.description,
    canonical: `https://therealhelp.com/${sldcWbeCertification.slug}`,
    keywords: sldcWbeCertification.seo.keywords,
    faqSchema: buildFaq(sldcWbeCertification.faqItems),
  },
  '/certifications/mo-oeo-mbe-certification': {
    title: moOeoMbeCertification.seo.title,
    description: moOeoMbeCertification.seo.description,
    canonical: `https://therealhelp.com/${moOeoMbeCertification.slug}`,
    keywords: moOeoMbeCertification.seo.keywords,
    faqSchema: buildFaq(moOeoMbeCertification.faqItems),
  },
  '/certifications/modot-dbe-certification': {
    title: metroBiStateDbeCertification.seo.title,
    description: metroBiStateDbeCertification.seo.description,
    canonical: 'https://therealhelp.com/certifications/modot-dbe-certification',
    keywords: metroBiStateDbeCertification.seo.keywords,
    faqSchema: buildFaq(metroBiStateDbeCertification.faqItems),
  },
  '/certifications/sba-8a-certification': {
    title: sba8aCertification.seo.title,
    description: sba8aCertification.seo.description,
    canonical: `https://therealhelp.com/${sba8aCertification.slug}`,
    keywords: sba8aCertification.seo.keywords,
    faqSchema: buildFaq(sba8aCertification.faqItems),
  },
  '/certifications/wosb-certification': {
    title: wosbCertification.seo.title,
    description: wosbCertification.seo.description,
    canonical: `https://therealhelp.com/${wosbCertification.slug}`,
    keywords: wosbCertification.seo.keywords,
    faqSchema: buildFaq(wosbCertification.faqItems),
  },
  '/certifications/sdvosb-certification': {
    title: sdvosbCertification.seo.title,
    description: sdvosbCertification.seo.description,
    canonical: `https://therealhelp.com/${sdvosbCertification.slug}`,
    keywords: sdvosbCertification.seo.keywords,
    faqSchema: buildFaq(sdvosbCertification.faqItems),
  },
  '/certifications/hubzone-certification': {
    title: hubzoneCertification.seo.title,
    description: hubzoneCertification.seo.description,
    canonical: `https://therealhelp.com/${hubzoneCertification.slug}`,
    keywords: hubzoneCertification.seo.keywords,
    faqSchema: buildFaq(hubzoneCertification.faqItems),
  },
  '/certifications/st-louis-county-mbe-certification': {
    title: stlCountyMbeCertification.seo.title,
    description: stlCountyMbeCertification.seo.description,
    canonical: `https://therealhelp.com/${stlCountyMbeCertification.slug}`,
    keywords: stlCountyMbeCertification.seo.keywords,
    faqSchema: buildFaq(stlCountyMbeCertification.faqItems),
  },
  '/certifications/metro-bi-state-dbe-certification': {
    title: metroBiStateDbeCertification.seo.title,
    description: metroBiStateDbeCertification.seo.description,
    canonical: `https://therealhelp.com/${metroBiStateDbeCertification.slug}`,
    keywords: metroBiStateDbeCertification.seo.keywords,
    faqSchema: buildFaq(metroBiStateDbeCertification.faqItems),
  },
  '/certifications/acdbe-certification': {
    title: acdbeCertification.seo.title,
    description: acdbeCertification.seo.description,
    canonical: `https://therealhelp.com/${acdbeCertification.slug}`,
    keywords: acdbeCertification.seo.keywords,
    faqSchema: buildFaq(acdbeCertification.faqItems),
  },
  '/certifications/msd-diversity-program': {
    title: msdDiversityProgram.seo.title,
    description: msdDiversityProgram.seo.description,
    canonical: `https://therealhelp.com/${msdDiversityProgram.slug}`,
    keywords: msdDiversityProgram.seo.keywords,
    faqSchema: buildFaq(msdDiversityProgram.faqItems),
  },
  '/contracts/mbe-supplier-vs-subcontractor': {
    title: mbeSupplierVsSubcontractor.seo.title,
    description: mbeSupplierVsSubcontractor.seo.description,
    canonical: `https://therealhelp.com/${mbeSupplierVsSubcontractor.slug}`,
    keywords: mbeSupplierVsSubcontractor.seo.keywords,
    faqSchema: buildFaq(mbeSupplierVsSubcontractor.faqItems),
  },
  '/blog/cds-evv-compliance-missouri': {
    title: 'CDS EVV Compliance Guide — Missouri 2025 | The Real Help, LLC',
    description:
      'Complete guide to Electronic Visit Verification (EVV) compliance for Missouri CDS agencies. AuthentiCare setup, billing alignment, and audit preparation.',
    canonical: 'https://therealhelp.com/blog/cds-evv-compliance-missouri',
    keywords: ['EVV compliance Missouri', 'CDS EVV Missouri', 'AuthentiCare Missouri'],
  },
  '/blog/mwbe-certification-guide-st-louis': {
    title: 'MWBE Certification Guide St. Louis 2025 | The Real Help, LLC',
    description:
      'Step-by-step guide to MBE and WBE certification in St. Louis. SLDC, MO OEO, and DBE certification explained — eligibility, documents, and timelines.',
    canonical: 'https://therealhelp.com/blog/mwbe-certification-guide-st-louis',
    keywords: ['MWBE certification guide', 'MBE certification St. Louis', 'WBE certification Missouri'],
  },
  '/blog/google-workspace-automation': {
    title: 'Google Workspace Automation for Small Business | The Real Help, LLC',
    description:
      'How to automate your business operations with Google Workspace. Apps Script, Make.com workflows, and AI integration for St. Louis small businesses.',
    canonical: 'https://therealhelp.com/blog/google-workspace-automation',
    keywords: ['Google Workspace automation', 'small business automation', 'Apps Script tutorial'],
  },
  '/blog/web-app-development-st-louis': {
    title: 'Web App Development St. Louis — What It Costs & What to Build | The Real Help, LLC',
    description:
      'Realistic guide to web app development costs in St. Louis. What to build first, what to skip, and how to get a working app without burning your budget.',
    canonical: 'https://therealhelp.com/blog/web-app-development-st-louis',
    keywords: ['web app development St. Louis', 'custom app cost St. Louis', 'client portal development'],
  },
  '/blog/capability-statement-guide': {
    title: 'Capability Statement Guide for Government Contracts | The Real Help, LLC',
    description:
      'How to write a government contractor capability statement that actually wins. Core competencies, past performance, differentiators, and formatting for SLDC and federal bids.',
    canonical: 'https://therealhelp.com/blog/capability-statement-guide',
    keywords: ['capability statement guide', 'government contractor capability statement', 'capability statement template'],
  },
  '/blog/medicaid-billing-errors': {
    title: 'Common Medicaid Billing Errors — CDS & Home Care Missouri | The Real Help, LLC',
    description:
      'The most common Medicaid billing errors for Missouri CDS and home care agencies — and how to fix them before they trigger a recoupment or audit.',
    canonical: 'https://therealhelp.com/blog/medicaid-billing-errors',
    keywords: ['Medicaid billing errors Missouri', 'CDS billing Missouri', 'Medicaid audit Missouri'],
  },
};

// ── Build head tags for a route ───────────────────────────────────────────

export function getRouteMeta(url: string): { headTags: string; faqSchemaJson: string } {
  const meta = META[url];
  if (!meta) return { headTags: '', faqSchemaJson: '' };

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  const parts: string[] = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    meta.keywords?.length
      ? `<meta name="keywords" content="${esc(meta.keywords.join(', '))}" />`
      : '',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ].filter(Boolean);

  const faqSchemaJson = meta.faqSchema ? JSON.stringify(meta.faqSchema) : '';

  return { headTags: parts.join('\n    '), faqSchemaJson };
}
