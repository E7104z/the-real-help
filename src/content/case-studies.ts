/**
 * Approved case studies for the /work page and the homepage "Receipts" section.
 *
 * SINGLE SOURCE OF TRUTH. Per .clinerules (Part A), portfolio and case-study
 * copy may use ONLY projects and facts Jason confirms in writing in
 * `docs/approved-claims.md`. Add entries here only after they are recorded
 * there with a source and date. Do not empty this list without asking Jason.
 */
export type CaseStudy = {
  /** Client or project name — must be an approved claim. */
  title: string;
  /** Short category line, e.g. "Website · Order requests". */
  kind: string;
  /** Absolute path to a screenshot under /public. */
  image: string;
  /** Alt text describing the screenshot. */
  alt: string;
  /** The business problem the project solved (approved wording). */
  problem: string;
  /** What was built / the outcome (approved wording). */
  fix: string;
  /** Optional live URL, only when approved. */
  href?: string;
  /** Optional label for the live link. */
  hrefLabel?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'A-Z Discount Flooring, wholesale storefront',
    kind: 'Website · Order requests',
    image: '/images/home/az-flooring.webp',
    alt: 'A-Z Discount Flooring website: premium wholesale luxury vinyl plank, delivered on time',
    problem: 'A wholesale flooring supplier needed contractors to browse colors and request pricing without a phone call every time.',
    fix: 'A fast, branded storefront with the full colorway catalog, filters, a before and after slider, and an order-request form that sends the lead straight to the team.',
  },
  {
    title: 'Tracy Smith, artist site + bookings',
    kind: 'Website · CRM automation',
    image: '/images/home/tracy-smith.webp',
    alt: 'Tracy Smith artist website hero with a Book Tracy button',
    problem: 'Booking requests needed to land somewhere organized, not in a pile of texts and emails.',
    fix: 'A premium artist site with a booking form wired straight into the booking CRM. Each inquiry is validated, spam-protected, and lands as a lead with a follow-up task already created.',
  },
  {
    title: 'Scheduler Pro',
    kind: 'Automation · Compliance',
    image: '/images/home/scheduler-pro.webp',
    alt: 'Scheduler Pro landing page: care plans generated in seconds',
    problem: 'Bigger agencies needed the same job done at volume, plus billing prep.',
    fix: 'Care plans generated in seconds with the unit calculations done automatically, then print or save as PDF. Cloud storage and EVV billing processing on the Pro tier.',
  },
  {
    title: 'KIDZ Transportation',
    kind: 'Operations dashboard',
    image: '/images/home/kidz-dashboard.webp',
    alt: 'KIDZ Transportation admin dashboard with applications, clients, drivers and weekly revenue',
    problem: 'Applications, families, drivers, routes and payroll all needed one home.',
    fix: 'One dashboard for the pipeline, clients, drivers, routes and payroll, with a paste-in importer to move off spreadsheets.',
  },
];

export const ALSO_SHIPPED = [
  'A booking CRM for talent agencies',
  'A league manager for a pool league',
];
