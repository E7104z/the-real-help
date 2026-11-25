import { useEffect, useId, useMemo, useRef, useState, type SyntheticEvent } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE } from './content';
import { trackEvent, getAttribution } from '@/lib/track';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Variant = 'footer' | 'hero' | 'offer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadForm({
  source = 'homepage',
  variant = 'footer',
}: {
  source?: string;
  variant?: Variant;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState('');
  const openedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const viewTracked = useRef(false);
  const headingId = useId();

  // Compact variants (hero, offer) live above the fold: three fields, no
  // business and no message. The footer variant keeps the fuller field set.
  const compact = variant !== 'footer';
  const heading = compact
    ? 'Not ready to call? Leave your number and the chore.'
    : 'Not a phone person? Leave your details.';

  // Attribution is captured once on page load (see captureAttribution in
  // @/lib/track, called from main.tsx) and read back here, so a lead submitted
  // from a second page still carries the first page's campaign.
  const attribution = useMemo(() => getAttribution(), []);

  // Fire form_view once when the form becomes at least 50% visible.
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (viewTracked.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            viewTracked.current = true;
            trackEvent('form_view', { form: variant });
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

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
        trackEvent('form_submit', { form: variant, result: 'ok' });
      } else {
        setStatus('error');
        trackEvent('form_submit', { form: variant, result: 'error' });
      }
    } catch {
      setStatus('error');
      trackEvent('form_submit', { form: variant, result: 'error' });
    }
  }

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit(e.currentTarget);
  };

  if (status === 'sent') {
    return (
      <div
        className={`rh-form rh-form--done${compact ? ' rh-form--hero' : ''}`}
        role="status"
      >
        <p className="rh-form__big">Got it.</p>
        <p>Thanks for sending that over. We&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id={variant === 'footer' ? 'contact' : undefined}
      className={`rh-form${compact ? ' rh-form--hero' : ''}`}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="rh-h3">
        {heading}
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
            What&rsquo;s the one chore you&rsquo;d hand off? <em>(optional)</em>
          </span>
          <input name="chore" type="text" maxLength={300} />
        </label>
        {!compact ? (
          <label className="rh-form__wide">
            <span>
              Business name <em>(optional)</em>
            </span>
            <input name="business" type="text" autoComplete="organization" maxLength={120} />
          </label>
        ) : null}
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
