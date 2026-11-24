/**
 * IndexNow ping — submits the latest sitemap URLs to IndexNow-compatible
 * search engines (Bing/Yandex) after a deploy.
 *
 * The key is public by design: it is verified by hosting a key file at the
 * site root (public/<key>.txt). It is NOT a secret.
 *
 * Run AFTER a successful deploy so the URLs are live:
 *   node scripts/indexnow.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const HOST = 'therealhelp.com';
const KEY = process.env.INDEXNOW_KEY ?? '9f2e4a7c1b8d6e3f5a0c2b9d4e7f8a1c';
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

const sitemapPath = resolve(ROOT, 'dist', 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.error('❌  dist/sitemap.xml not found — run npm run build first.');
  process.exit(1);
}

const urls = [
  ...readFileSync(sitemapPath, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => m[1]);

if (!urls.length) {
  console.error('❌  No <loc> URLs found in dist/sitemap.xml.');
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
};

let failed = false;
for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log(`  ${res.status}  ${endpoint}`);
    if (res.status !== 200 && res.status !== 202) failed = true;
  } catch (err) {
    console.warn(`  ✗  ${endpoint}  (${err.message})`);
    failed = true;
  }
}

if (failed) {
  console.log('');
  console.log('⚠️  Some endpoints did not confirm. IndexNow accepts 200/202; check network.');
  process.exitCode = 1;
} else {
  console.log('');
  console.log(`✅  Submitted ${urls.length} URLs to IndexNow.`);
}
