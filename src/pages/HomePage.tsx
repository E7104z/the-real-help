import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Mail, Phone } from 'lucide-react';
import {
  ALSO_SHIPPED,
  BOOKING_URL,
  CHORES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FAQ,
  MARQUEE,
  NOTES,
  PHONE_HREF,
  PRICE_MONTHLY,
  PRICE_START,
  STEPS,
  WORK,
} from './home/content';
import '@fontsource/bricolage-grotesque/500.css';
import '@fontsource/bricolage-grotesque/700.css';
import '@fontsource/bricolage-grotesque/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/permanent-marker/400.css';
import './home/home.css';

const hasPhone = Boolean(CONTACT_PHONE && PHONE_HREF);

function CallButton({ className = '' }: { className?: string }) {
  if (!hasPhone) return null;
  return (
    <a className={`rh-btn rh-btn--tomato ${className}`} href={PHONE_HREF}>
      <Phone size={18} strokeWidth={2.6} aria-hidden="true" />
      Call {CONTACT_PHONE}
    </a>
  );
}

function BookButton({ className = '', primary = false }: { className?: string; primary?: boolean }) {
  return (
    <a
      className={`rh-btn ${primary ? 'rh-btn--tomato' : 'rh-btn--white'} ${className}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CalendarDays size={18} strokeWidth={2.6} aria-hidden="true" />
      Book a free call
    </a>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title = 'The Real Help | Custom Software, AI & Automation for Small Business';
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      {/* ───────── Header ───────── */}
      <header className="rh-header">
        <a className="rh-brand" href="#top" aria-label="The Real Help, home">
          <span className="rh-brand__mark" aria-hidden="true">
            R
          </span>
          <span className="rh-brand__name">The Real Help</span>
        </a>
        <nav className="rh-nav" aria-label="Primary">
          <a href="#fixes">What we fix</a>
          <a href="#work">Receipts</a>
          <a href="#price">Price</a>
          <a href="#faq">FAQ</a>
        </nav>
        {hasPhone ? <CallButton className="rh-btn--small" /> : <BookButton primary className="rh-btn--small" />}
      </header>

      <main id="main">
        {/* ───────── Hero ───────── */}
        <section className="rh-hero" id="top">
          <div className="rh-hero__copy">
            <p className="rh-sticker">Custom software · AI · Automation</p>
            <h1 className="rh-h1">
              Tired of doing it <span className="rh-scribble">by hand?</span>
            </h1>
            <p className="rh-lede">
              We build the tool that does it for you. Custom software, AI and automation for small
              businesses. Built in weeks, priced up front, <strong>starting at {PRICE_START}</strong>.
            </p>
            <div className="rh-cta-row">
              {hasPhone ? <CallButton /> : null}
              <BookButton primary={!hasPhone} />
            </div>
            <p className="rh-fine">St. Louis, MO · Fixed prices · No jargon</p>
          </div>

          <div className="rh-hero__art" aria-hidden="true">
            <div className="rh-pad">
              <p className="rh-pad__title">This week’s to-do</p>
              <ul className="rh-pad__list">
                {CHORES.map((c, i) => (
                  <li key={c} style={{ ['--i' as string]: i }}>
                    <span className="rh-pad__text">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="rh-pad__stamp">Let a computer do it</div>
            </div>
            <div className="rh-badge">
              <span>from</span>
              <strong>{PRICE_START}</strong>
              <span>fixed price</span>
            </div>
          </div>
        </section>

        {/* ───────── Marquee ───────── */}
        <div className="rh-marquee" aria-hidden="true">
          <div className="rh-marquee__track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={`${m}-${i}`}>
                {m}
                <i>✱</i>
              </span>
            ))}
          </div>
        </div>

        {/* ───────── Pain → fix ───────── */}
        <section className="rh-section" id="fixes" aria-labelledby="fixes-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Sound familiar?</p>
            <h2 id="fixes-h" className="rh-h2">
              The chores we love to kill
            </h2>
          </div>
          <div className="rh-notes">
            {NOTES.map((n) => (
              <article
                key={n.you}
                className={`rh-note rh-note--${n.tone}`}
                style={{ ['--tilt' as string]: `${n.tilt}deg` }}
              >
                <p className="rh-note__label">You say</p>
                <p className="rh-note__you">{n.you}</p>
                <p className="rh-note__label rh-note__label--we">We build</p>
                <p className="rh-note__we">{n.we}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── Work ───────── */}
        <section className="rh-section rh-section--ink" id="work" aria-labelledby="work-h">
          <div className="rh-section__head">
            <p className="rh-kicker rh-kicker--light">Proof</p>
            <h2 id="work-h" className="rh-h2 rh-h2--light">
              Receipts, not promises.
            </h2>
            <p className="rh-sub rh-sub--light">A few things we’ve already built and shipped.</p>
          </div>
          <div className="rh-work">
            {WORK.map((w, i) => (
              <article key={w.title} className="rh-card" style={{ ['--tilt' as string]: i % 2 ? '1deg' : '-1deg' }}>
                <div className="rh-browser">
                  <div className="rh-browser__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <img src={w.image} alt={w.alt} loading="lazy" width={1400} height={800} />
                </div>
                <div className="rh-card__body">
                  <p className="rh-chip">{w.kind}</p>
                  <h3 className="rh-h3">{w.title}</h3>
                  <p className="rh-card__line">
                    <b>The chore:</b> {w.problem}
                  </p>
                  <p className="rh-card__line">
                    <b>The fix:</b> {w.fix}
                  </p>
                  {w.href ? (
                    <a className="rh-link" href={w.href} target="_blank" rel="noopener noreferrer">
                      {w.hrefLabel ?? 'See it live'} <ArrowUpRight size={16} strokeWidth={2.8} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <p className="rh-also">
            <span>Also shipped:</span>
            {ALSO_SHIPPED.map((a) => (
              <em key={a}>{a}</em>
            ))}
          </p>
        </section>

        {/* ───────── How it works ───────── */}
        <section className="rh-section" id="how" aria-labelledby="how-h">
          <div className="rh-section__head">
            <p className="rh-kicker">How it works</p>
            <h2 id="how-h" className="rh-h2">
              Three steps. Zero surprises.
            </h2>
          </div>
          <ol className="rh-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="rh-step">
                <span className="rh-step__n" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="rh-h3">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── Pricing ───────── */}
        <section className="rh-section rh-section--tint" id="price" aria-labelledby="price-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Pricing</p>
            <h2 id="price-h" className="rh-h2">
              Cheap enough to just try.
            </h2>
            <p className="rh-sub">No hourly meter. You know the price before we start.</p>
          </div>
          <div className="rh-prices">
            <article className="rh-price rh-price--hot">
              <p className="rh-price__tag">Start here</p>
              <h3 className="rh-h3">The Quick Fix</h3>
              <p className="rh-price__big">
                {PRICE_START}
                <small> one time</small>
              </p>
              <p className="rh-price__sub">
                + {PRICE_MONTHLY}/month to keep it running
              </p>
              <ul className="rh-ticks">
                <li>One real chore, solved with a working tool</li>
                <li>Built around the way you already work</li>
                <li>Fixed price, agreed before we start</li>
                <li>Live in weeks, not months</li>
              </ul>
              <BookButton primary className="rh-btn--block" />
            </article>
            <article className="rh-price">
              <p className="rh-price__tag rh-price__tag--alt">Bigger idea?</p>
              <h3 className="rh-h3">Custom Build</h3>
              <p className="rh-price__big rh-price__big--text">Fixed quote</p>
              <p className="rh-price__sub">after a free intro call</p>
              <ul className="rh-ticks">
                <li>Multi-step automations and full apps</li>
                <li>AI assistants trained on your own info</li>
                <li>Customer portals and dashboards</li>
                <li>Priced to the job, never by the hour</li>
              </ul>
              {hasPhone ? <CallButton className="rh-btn--block" /> : <BookButton className="rh-btn--block" />}
            </article>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="rh-section" id="faq" aria-labelledby="faq-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Quick answers</p>
            <h2 id="faq-h" className="rh-h2">
              Fair questions
            </h2>
          </div>
          <div>
            <div className="rh-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Final CTA ───────── */}
        <section className="rh-final" aria-labelledby="final-h">
          <div className="rh-final__box">
            <h2 id="final-h" className="rh-h2 rh-h2--huge">
              Tell us what’s eating your week.
            </h2>
            <p className="rh-sub">Free intro call. We’ll tell you honestly if we can help.</p>
            <div className="rh-cta-row rh-cta-row--center">
              {hasPhone ? <CallButton /> : null}
              <BookButton primary={!hasPhone} />
              <a className="rh-btn rh-btn--white" href={`mailto:${CONTACT_EMAIL}`}>
                <Mail size={18} strokeWidth={2.6} aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="rh-footer">
        <p>© {new Date().getFullYear()} The Real Help, LLC · St. Louis, MO</p>
        <p>
          <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
        </p>
      </footer>

      {/* Mobile action bar */}
      <div className="rh-bar">
        {hasPhone ? <CallButton className="rh-btn--small" /> : null}
        <BookButton primary={!hasPhone} className="rh-btn--small" />
      </div>
    </div>
  );
}
