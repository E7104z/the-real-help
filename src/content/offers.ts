/**
 * Offer landing pages (/offer/<slug>).
 *
 * SINGLE SOURCE OF TRUTH. Per .clinerules (Part A) and Part D of the brief,
 * offer copy may use ONLY facts approved in `.clinerules` and
 * `docs/approved-claims.md`. Add offers here to publish them; the router, SSR
 * entry and prerender script all read this list.
 */
export type Offer = {
  /** URL slug, e.g. "quick-fix" for /offer/quick-fix. */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  lede: string;
  bullets: string[];
  priceLine: string;
};

export const OFFERS: Offer[] = [
  {
    slug: 'quick-fix',
    metaTitle: 'The Quick Fix — $500 Fixed Price | The Real Help',
    metaDescription:
      'Hand off one chore. We build a working tool for $500 one time + $30/month, fixed price, live in days. St. Louis, MO.',
    headline: 'Hand off one chore. Get a working tool.',
    lede: 'One real chore, solved with a working tool. Built around the way you already work — fixed price, agreed before we start, live in days.',
    bullets: [
      'One real chore, solved with a working tool',
      'Built around the way you already work',
      'Fixed price, agreed before we start',
      'Live in days, not months',
    ],
    priceLine: '$500 one time + $30/month, fixed price, live in days',
  },
];

export function findOffer(slug: string): Offer | undefined {
  return OFFERS.find((o) => o.slug === slug);
}
