import { useMemo, useRef, useState, type SyntheticEvent } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE } from './content';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadForm({ source = 'homepage' }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState('');
  const openedAt = useRef(Date.now());

  // Attribution captured once when the form mounts (partner ref, UTM params,
  // landing page, referrer). Guarded so the component stays SSR-safe.
  const attribution = useMemo(() => {
    if (typeof window === 'undefined') {
      return { ref: '', utm: {}, landingPage: '/', referrer: '' };
    }
    const url = new URL(window.location.href);
    const g = (k: string) => url.searchParams.get(k)?.trim() ?? '';
    return {
      ref: g('ref'),
      utm: {
        utm_source: g('utm_source'),
        utm_medium: g('utm_medium'),
        utm_campaign: g('utm_campaign'),
        utm_term: g('utm_term'),
        utm_content: g('utm_content'),
      },
      landingPage: url.pathname || '/',
      referrer: document.referrer,
    };
  }, []);

  async function submit(form: HTMLFormElement) {
    if (status === 'sending') return;
    const fd = new FormData(form);
    const val = (k: string) => {
      const v = fd.get(k);
      return typeof v === 'string' ? v.trim() : '';
    };

    const name = val('name');
    const contact = val('contact');
    if (!name) return setFieldError('Please add your name.');
    if (!EMAIL_RE.test(contact) && contact.replace(/\D/g, '').length < 10) {
      return setFieldError('Add a phone number or email so we can reach you.');
    }
    setFieldError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          business: val('business'),
          chore: val('chore'),
          message: val('message'),
          website: val('website'), // honeypot
          elapsedMs: Date.now() - openedAt.current,
          source,
          ref: attribution.ref,
          utm: attribution.utm,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && data?.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit(e.currentTarget);
  };

  if (status === 'sent') {
    return (
      <div className="rh-form rh-form--done" role="status">
        <p className="rh-form__big">Got it.</p>
        <p>Thanks for sending that over. We&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form id="contact" className="rh-form" onSubmit={onSubmit} noValidate aria-labelledby="lead-h">
      <h3 id="lead-h" className="rh-h3">
        Not a phone person? Leave your details.
      </h3>
      <div className="rh-form__grid">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required />
        </label>
        <label>
          <span>Phone or email</span>
          <input name="contact" type="text" autoComplete="email" maxLength={120} required />
        </label>
        <label className="rh-form__wide">
          <span>
            Business name <em>(optional)</em>
          </span>
          <input name="business" type="text" autoComplete="organization" maxLength={120} />
        </label>
        <label className="rh-form__wide">
          <span>
            What&rsquo;s the one chore you&rsquo;d hand off? <em>(optional)</em>
          </span>
          <input name="chore" type="text" maxLength={300} />
        </label>
        <label className="rh-form__wide">
          <span>
            What&rsquo;s eating your week? <em>(optional)</em>
          </span>
          <textarea name="message" rows={3} maxLength={1500} />
        </label>
        {/* Honeypot: hidden from people, bots fill it in. */}
        <div className="rh-form__trap" aria-hidden="true">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {fieldError ? (
        <p className="rh-form__msg" role="alert">
          {fieldError}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="rh-form__msg" role="alert">
          That didn&rsquo;t go through. Please call {CONTACT_PHONE || 'us'} or email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      ) : null}

      <button className="rh-btn rh-btn--tomato rh-btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
    </form>
  );
}
