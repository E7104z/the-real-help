import crypto from 'node:crypto';

/**
 * POST /api/lead
 * Receives the homepage lead form and appends it to a Google Sheet through a
 * Google Apps Script web app (see apps-script/Code.gs).
 *
 * Required environment variables (Vercel):
 *   LEAD_WEBHOOK_URL     the Apps Script web app URL (…/exec)
 *   LEAD_WEBHOOK_SECRET  shared secret, must match the script property SECRET
 *
 * It never reports success unless the sheet write was confirmed.
 */

const MAX = { name: 100, contact: 120, business: 120, message: 1500, chore: 300 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

/**
 * Forward a copy of the lead to AgentLab so it can reply in minutes.
 * HMAC-signed per the AgentLab repo's docs/WEBSITE_HOOK.md. The forward is
 * awaited with a short timeout, so a slow or down AgentLab can delay the
 * visitor's success by at most ~3s; the Sheet already has the lead, and
 * AgentLab's daily digest makes any gap visible.
 */
async function forwardToAgentLab(lead) {
  const url = process.env.AGENTLAB_LEAD_URL;
  const secret = process.env.AGENTLAB_LEAD_SECRET;
  if (!url || !secret) return;
  const raw = JSON.stringify(lead);
  const t = Math.floor(Date.now() / 1000);
  const v1 = crypto.createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex');
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Signature': `t=${t},v1=${v1}` },
      body: raw,
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) console.error('agentlab forward failed', r.status);
  } catch (err) {
    console.error('agentlab forward error', err instanceof Error ? err.message : err);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {};

  // Bot traps: hidden field filled in, or submitted faster than a human can type.
  const elapsed = Number(body.elapsedMs);
  if (clean(body.website, 50) || (Number.isFinite(elapsed) && elapsed < 1500)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const contact = clean(body.contact, MAX.contact);
  const business = clean(body.business, MAX.business);
  const message = clean(body.message, MAX.message);
  const chore = clean(body.chore, MAX.chore);
  // The sheet has no chore column, so the answer goes in front of the message.
  const sheetMessage = chore ? [`Chore to hand off: ${chore}`, message].filter(Boolean).join(' | ') : message;

  const digits = contact.replace(/\D/g, '');
  const validContact = EMAIL_RE.test(contact) || digits.length >= 10;
  if (!name || !validContact) {
    return res.status(400).json({ ok: false, error: 'invalid_input' });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('lead: LEAD_WEBHOOK_URL / LEAD_WEBHOOK_SECRET not configured');
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
      body: JSON.stringify({
        secret,
        name,
        contact,
        business,
        message: sheetMessage,
        source: clean(body.source, 60) || 'homepage',
      }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result?.ok) {
      console.error('lead: sheet write failed', upstream.status, result?.error);
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    await forwardToAgentLab({
      leadId: crypto.randomUUID(),
      name,
      contact,
      business,
      message,
      chore,
      ref: clean(body.ref, 40),
      utm: typeof body.utm === 'object' && body.utm ? body.utm : {},
      landingPage: clean(body.landingPage, 300),
      referrer: clean(body.referrer, 300),
      source: clean(body.source, 60) || 'homepage',
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead: request error', err instanceof Error ? err.message : err);
    return res.status(502).json({ ok: false, error: 'upstream_failed' });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
