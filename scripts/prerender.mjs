/**
 * Pre-render script — injects page-specific <head> tags into per-route
 * HTML files at build time. Uses a pure data-driven approach (no React
 * rendering) so it works correctly with React 19 + react-helmet-async v3.
 *
 * For each marketing route it:
 *  1. Replaces <title>, <meta description>, <link canonical>, OG/Twitter tags
 *  2. Appends a FAQ JSON-LD <script> before </head> if the page has FAQ data
 *  3. Writes dist/{route}/index.html
 *
 * Vercel serves static files before applying rewrites, so pre-rendered pages
 * get their specific head tags; app/admin/portal routes fall through to the SPA.
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
const { META, getRouteMeta } = await import(pathToFileURL(SSR_BUNDLE).href);

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

function injectFaq(html, faqJson) {
  if (!faqJson) return html;
  const tag = `\n    <script type="application/ld+json">${faqJson}</script>`;
  return html.replace('</head>', `${tag}\n  </head>`);
}

// ── Main ─────────────────────────────────────────────────────────────────

console.log('\nPre-rendering head tags for all marketing routes…\n');

let ok = 0, skipped = 0;

for (const url of Object.keys(META)) {
  try {
    const { faqSchemaJson } = getRouteMeta(url);
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
    html = injectFaq(html, faqSchemaJson);

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

console.log(`\n✅  Done — ${ok} pre-rendered, ${skipped} skipped.\n`);
