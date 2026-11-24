/**
 * Pre-render script — renders every marketing route to full static HTML
 * (body + head) at build time and writes dist/{route}/index.html.
 *
 * For each marketing route it:
 *  1. Renders the page body with the SSR entry (renderToString) and injects it
 *     into the #root element
 *  2. Replaces <title>, <meta description>, <link canonical>, OG/Twitter tags
 *  3. Injects shared JSON-LD (Organization, LocalBusiness, Service) plus
 *     page-specific JSON-LD (FAQPage, BreadcrumbList) before </head>
 *  4. Writes dist/{route}/index.html
 *
 * It also regenerates dist/sitemap.xml from the same route map.
 *
 * Vercel serves static files before applying rewrites, so pre-rendered pages
 * get their full content; /login, /app, /admin and /portal get dist/shell.html.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT       = resolve(dirname(__filename), '..');
const DIST       = resolve(ROOT, 'dist');
const SSR_BUNDLE = resolve(ROOT, 'dist-ssr', 'entry-server.js');

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error('❌  dist/index.html not found — run vite build first.');
  process.exit(1);
}
if (!existsSync(SSR_BUNDLE)) {
  console.error('❌  dist-ssr/entry-server.js not found.');
  process.exit(1);
}

const SHELL = readFileSync(resolve(DIST, 'index.html'), 'utf-8');
// Login, portal, admin and app routes are served this empty shell (vercel.json),
// so visitors never see the pre-rendered homepage before those pages load.
if (!/<div id="root">\s*<\/div>/.test(SHELL)) {
  console.error('❌  dist/index.html is already pre-rendered — run vite build first.');
  process.exit(1);
}
writeFileSync(resolve(DIST, 'shell.html'), SHELL, 'utf-8');
const { META, SHARED_JSONLD, getRouteMeta, renderBody } = await import(pathToFileURL(SSR_BUNDLE).href);

const sharedJsonLdTags = SHARED_JSONLD.map(
  (o) => `    <script type="application/ld+json">${JSON.stringify(o)}</script>`,
).join('\n');

// ── Helpers ──────────────────────────────────────────────────────────────

function replaceTitle(html, value) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${value}</title>`);
}

function replaceMetaContent(html, nameOrProp, value) {
  // Matches:  content="..."  inside a tag that has name="..." or property="..."
  const escaped = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const re = new RegExp(
    `(<meta[^>]+(?:name|property)="${nameOrProp}"[^>]+content=")[^"]*(")`
  );
  if (re.test(html)) return html.replace(re, `$1${escaped}$2`);
  // Try reversed attribute order: content="..." name="..."
  const re2 = new RegExp(
    `(<meta[^>]+content=")[^"]*("[^>]+(?:name|property)="${nameOrProp}")`
  );
  return html.replace(re2, `$1${escaped}$2`);
}

function replaceCanonical(html, value) {
  return html.replace(
    /(<link[^>]+rel="canonical"[^>]+href=")[^"]*(")/,
    `$1${value}$2`
  );
}

function injectJsonLd(html, tags) {
  if (!tags) return html;
  return html.replace('</head>', `${tags}\n  </head>`);
}

function injectKeywords(html, keywords) {
  if (!keywords?.length) return html;
  const value = keywords.join(', ').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const tag = `<meta name="keywords" content="${value}" />`;
  return html.replace('</head>', `${tag}\n  </head>`);
}

function injectBody(html, body) {
  if (!body) return html;
  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${body}</div>`);
}

function buildSitemap() {
  const now = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(META)
    .map((url) => {
      const loc = META[url].canonical;
      const isHome = loc === 'https://therealhelp.com/' || loc === 'https://therealhelp.com';
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <changefreq>${isHome ? 'weekly' : 'monthly'}</changefreq>`,
        `    <priority>${isHome ? '1.0' : '0.6'}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// ── Main ─────────────────────────────────────────────────────────────────

console.log('\nPre-rendering head tags for all marketing routes…\n');

let ok = 0, skipped = 0;

for (const url of Object.keys(META)) {
  try {
    const { jsonLdTags } = getRouteMeta(url);
    const m = META[url];

    let html = SHELL;
    html = replaceTitle(html, m.title);
    html = replaceMetaContent(html, 'description', m.description);
    html = replaceCanonical(html, m.canonical);
    html = replaceMetaContent(html, 'og:title', m.title);
    html = replaceMetaContent(html, 'og:description', m.description);
    html = replaceMetaContent(html, 'og:url', m.canonical);
    html = replaceMetaContent(html, 'twitter:title', m.title);
    html = replaceMetaContent(html, 'twitter:description', m.description);
    html = injectKeywords(html, m.keywords);
    html = injectJsonLd(html, [sharedJsonLdTags, jsonLdTags].filter(Boolean).join('\n'));
    html = injectBody(html, renderBody(url));

    const outPath =
      url === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, url.slice(1), 'index.html');

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf-8');
    console.log(`  ✓  ${url}`);
    ok++;
  } catch (err) {
    console.warn(`  ✗  ${url}  (${err.message})`);
    skipped++;
  }
}

writeFileSync(resolve(DIST, 'sitemap.xml'), buildSitemap(), 'utf-8');
console.log('  ✓  sitemap.xml');

console.log(`\n✅  Done — ${ok} pre-rendered, ${skipped} skipped.\n`);
