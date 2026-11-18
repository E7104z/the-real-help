/**
 * Data-driven SSR entry point — NO React rendering.
 *
 * react-helmet-async v3 disabled SSR context support for React 19.
 * Instead, we export a static meta map. The prerender script reads this map
 * and injects correct <head> tags into the built HTML at build time.
 */

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  faqSchema?: object;
}

export const META: Record<string, RouteMeta> = {
  '/': {
    title: 'The Real Help | Custom Software, AI & Automation for Small Business',
    description:
      'Tired of doing it by hand? The Real Help builds custom software, AI and automation for small businesses. Built in weeks, fixed price, starting at $500. St. Louis, MO.',
    canonical: 'https://therealhelp.com/',
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
