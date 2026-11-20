/**
 * SSR entry point for pre-rendering marketing pages.
 *
 * Exports the route metadata and structured data used to build each page's
 * <head>, plus renderBody() which renders a route's full visible content to
 * HTML with renderToString (not renderToStaticMarkup) so the client can
 * hydrate it in place with hydrateRoot instead of wiping and re-drawing it.
 */
import { renderToString } from 'react-dom/server';
import type { ReactElement } from 'react';
import HomePage from '@/pages/HomePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  serviceOfferSchema,
  webSiteSchema,
} from '@/lib/seo/schema';
import { FAQ } from '@/pages/home/content';

interface Crumb {
  name: string;
  path: string;
}

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  breadcrumb?: Crumb[];
  faqs?: { q: string; a: string }[];
}

export const META: Record<string, RouteMeta> = {
  '/': {
    title: 'The Real Help | Custom Software, AI & Automation for Small Business',
    description:
      'Tired of doing it by hand? The Real Help builds custom software, AI and automation for small businesses. Built in weeks, fixed price, starting at $500. St. Louis, MO.',
    canonical: 'https://therealhelp.com/',
    keywords: [
      'custom software',
      'small business automation',
      'AI tools',
      'workflow automation',
      'St. Louis software company',
    ],
    faqs: FAQ,
  },
  '/privacy': {
    title: 'Privacy Policy | The Real Help',
    description:
      'How The Real Help, LLC collects, uses and protects your information on therealhelp.com.',
    canonical: 'https://therealhelp.com/privacy',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  },
  '/terms': {
    title: 'Terms of Service | The Real Help',
    description:
      'The terms that apply when you use therealhelp.com and The Real Help services.',
    canonical: 'https://therealhelp.com/terms',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  },
};

export const SHARED_JSONLD: object[] = [
  organizationSchema(),
  webSiteSchema(),
  localBusinessSchema(),
  serviceOfferSchema(),
];

// ── Build head tags for a route ───────────────────────────────────────────

export function getRouteMeta(url: string): { jsonLdTags: string } {
  const meta = META[url];
  if (!meta) return { jsonLdTags: '' };

  const tags: object[] = [];
  if (meta.faqs?.length) tags.push(faqSchema(meta.faqs));
  if (meta.breadcrumb?.length) tags.push(breadcrumbSchema(meta.breadcrumb));

  const jsonLdTags = tags
    .map((t) => `    <script type="application/ld+json">${JSON.stringify(t)}</script>`)
    .join('\n');

  return { jsonLdTags };
}

// ── Body rendering ────────────────────────────────────────────────────────

const MARKETING_BODIES: Record<string, () => ReactElement> = {
  '/': () => <HomePage />,
  '/privacy': () => <PrivacyPolicyPage />,
  '/terms': () => <TermsPage />,
};

/**
 * Renders a marketing route's full visible content to an HTML string for the
 * pre-rendered body. Returns an empty string for routes with no body.
 */
export function renderBody(url: string): string {
  const build = MARKETING_BODIES[url];
  if (!build) return '';
  return renderToString(build());
}
