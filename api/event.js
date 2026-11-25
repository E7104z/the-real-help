/**
 * POST /api/event
 * Receives analytics events from the client tracker (src/lib/track.ts) and
 * forwards a cleaned, whitelisted copy to the leads Google Sheet (Events tab)
 * through the same Apps Script web app as api/lead.js.
 *
 * It is fire-and-forget on purpose: the browser always gets a 204 so a slow
 * Sheet write never delays a click, and no IP address or user agent is ever
 * recorded.
 */

const NAMES = new Set(['cta_click', 'form_view', 'form_submit']);
const ACTIONS = new Set(['call', 'book', 'email']);
const FORMS = new Set(['hero', 'footer', 'offer']);
const RESULTS = new Set(['ok', 'error']);
const LOCATIONS = new Set([
  'header',
  'hero',
  'inbox',
  'price_quick',
  'price_custom',
  'final',
  'mobile_bar',
  'footer',
  'offer',
]);

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {};

  const name = clean(body.name, 100);
  if (!NAMES.has(name)) {
    // Unknown event name: drop silently.
    return res.status(204).end();
  }

  const event = { name };
  const action = clean(body.action, 100);
  if (ACTIONS.has(action)) event.action = action;
  const form = clean(body.form, 100);
  if (FORMS.has(form)) event.form = form;
  const result = clean(body.result, 100);
  if (RESULTS.has(result)) event.result = result;
  const location = clean(body.location, 100);
  if (LOCATIONS.has(location)) event.location = location;

  event.page = clean(body.page, 200);
  event.utm_source = clean(body.utm_source, 100);
  event.utm_medium = clean(body.utm_medium, 100);
  event.utm_campaign = clean(body.utm_campaign, 100);
  event.utm_content = clean(body.utm_content, 100);
  event.ref = clean(body.ref, 100);
  event.referrerHost = clean(body.referrerHost, 100);
  event.sid = clean(body.sid, 100);

  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('event: LEAD_WEBHOOK_URL / LEAD_WEBHOOK_SECRET not configured');
    return res.status(204).end();
  }

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
      body: JSON.stringify({ secret, kind: 'event', ...event }),
      signal: AbortSignal.timeout(3000),
    });
    const upstreamResult = await upstream.json().catch(() => null);
    if (!upstream.ok || !upstreamResult?.ok) {
      console.error('event: sheet write failed', upstream.status, upstreamResult?.error);
    }
  } catch (err) {
    console.error('event: request error', err instanceof Error ? err.message : err);
  }

  return res.status(204).end();
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
