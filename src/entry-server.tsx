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
import WorkPage from '@/pages/WorkPage';
import ServicesPage from '@/pages/ServicesPage';
import PricingPage from '@/pages/PricingPage';
import AboutPage from '@/pages/AboutPage';
import StLouisPage from '@/pages/StLouisPage';
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
  '/work': {
    title: 'Our Work | The Real Help | Custom Software, AI & Automation',
    description:
      'How The Real Help works and what we build for small businesses: websites, custom apps, AI and automation. Built in weeks, fixed price, starting at $500.',
    canonical: 'https://therealhelp.com/work',
    keywords: [
      'custom software portfolio',
      'small business automation examples',
      'AI tools for small business',
      'St. Louis software company work',
    ],
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
    ],
    faqs: FAQ,
  },
  '/services': {
    title: 'Services | The Real Help | Custom Software, AI & Automation',
    description:
      'Websites, apps, AI and automation for small businesses. The Real Help builds custom software in weeks, at a fixed price. St. Louis, MO.',
    canonical: 'https://therealhelp.com/services',
    keywords: [
      'custom software',
      'small business automation',
      'AI tools',
      'custom app development',
      'workflow automation',
    ],
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  },
  '/pricing': {
    title: 'Pricing | The Real Help | Fixed Price, No Hourly Meter',
    description:
      'The Quick Fix: $500 one time + $30/month. Custom builds get a fixed quote after a free intro call. No hourly billing. St. Louis, MO.',
    canonical: 'https://therealhelp.com/pricing',
    keywords: [
      'custom software pricing',
      'small business automation cost',
      'fixed price software',
      'AI tools cost',
    ],
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
    faqs: FAQ,
  },
  '/about': {
    title: 'About | The Real Help | Custom Software & AI for Small Business',
    description:
      'The Real Help, LLC is a St. Louis, MO company founded by Jason Griffin that builds custom software, AI tools and workflow automation for small businesses.',
    canonical: 'https://therealhelp.com/about',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  '/st-louis': {
    title: 'Custom Software & AI for St. Louis Small Business | The Real Help',
    description:
      'The Real Help, LLC builds custom software, AI tools and workflow automation for small businesses in St. Louis, MO. Fixed price, live in weeks.',
    canonical: 'https://therealhelp.com/st-louis',
    keywords: [
      'St. Louis custom software',
      'St. Louis small business automation',
      'St. Louis AI tools',
      'St. Louis web development',
    ],
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'St. Louis', path: '/st-louis' },
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
  '/work': () => <WorkPage />,
  '/services': () => <ServicesPage />,
  '/pricing': () => <PricingPage />,
  '/about': () => <AboutPage />,
  '/st-louis': () => <StLouisPage />,
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
