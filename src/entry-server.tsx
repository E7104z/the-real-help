/**
 * Data-driven SSR entry point — NO React rendering.
 *
 * react-helmet-async v3 disabled SSR context support for React 19.
 * Instead, we export a static meta map. The prerender script reads this map
 * and injects correct <head> tags into the built HTML at build time.
 */

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
