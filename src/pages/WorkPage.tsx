import { useEffect } from "react";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { CASE_STUDIES } from "@/content/case-studies";
import { COPYRIGHT_YEAR } from "@/lib/constants/site";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FAQ,
  PHONE_HREF,
  PRICE_MONTHLY,
  PRICE_START,
  STEPS,
  WHATEVER,
} from "./home/content";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";

const hasPhone = Boolean(CONTACT_PHONE && PHONE_HREF);

function CallButton({ className = "" }: { className?: string }) {
  if (!hasPhone) return null;
  return (
    <a className={`rh-btn rh-btn--tomato ${className}`} href={PHONE_HREF}>
      <Phone size={18} strokeWidth={2.6} aria-hidden="true" />
      Call {CONTACT_PHONE}
    </a>
  );
}

function BookButton({
  className = "",
  primary = false,
}: {
  className?: string;
  primary?: boolean;
}) {
  return (
    <a
      className={`rh-btn ${primary ? "rh-btn--tomato" : "rh-btn--white"} ${className}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CalendarDays size={18} strokeWidth={2.6} aria-hidden="true" />
      Book a free call
    </a>
  );
}

export default function WorkPage() {
  useEffect(() => {
    document.title = "Our Work | The Real Help | Custom Software, AI & Automation";
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      <header className="rh-header">
        <a className="rh-brand" href="/" aria-label="The Real Help, home">
          <span className="rh-brand__mark" aria-hidden="true">
            R
          </span>
          <span className="rh-brand__name">The Real Help</span>
        </a>
        <nav className="rh-nav" aria-label="Primary">
          <a href="#services">What we build</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        {hasPhone ? (
          <CallButton className="rh-btn--small" />
        ) : (
          <BookButton primary className="rh-btn--small" />
        )}
      </header>

      <main id="main">
        <section className="rh-section" id="top">
          <p className="rh-sticker">Our work</p>
          <h1 className="rh-h1">
            The stuff we&rsquo;ve <span className="rh-scribble">shipped.</span>
          </h1>
          <p className="rh-lede">
            Websites, apps, AI and automation for small businesses — built in
            weeks, fixed price, <strong>starting at {PRICE_START}</strong>.
            Here&rsquo;s what we build and how the whole thing works.
          </p>
          <div className="rh-cta-row">
            {hasPhone ? <CallButton /> : null}
            <BookButton primary={!hasPhone} />
          </div>
          <p className="rh-fine">St. Louis, MO · Fixed prices · No jargon</p>
        </section>

        <section
          className="rh-section rh-section--ink"
          id="work"
          aria-labelledby="work-h"
        >
          <div className="rh-section__head">
            <p className="rh-kicker rh-kicker--light">Proof</p>
            <h2 id="work-h" className="rh-h2 rh-h2--light">
              Receipts, not promises.
            </h2>
            <p className="rh-sub rh-sub--light">
              Case studies we have permission to share.
            </p>
          </div>
          {CASE_STUDIES.length ? (
            <div className="rh-work">
              {CASE_STUDIES.map((w, i) => (
                <article
                  key={w.title}
                  className="rh-card"
                  style={{ ["--tilt" as string]: i % 2 ? "1deg" : "-1deg" }}
                >
                  <div className="rh-browser">
                    <div className="rh-browser__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <img
                      src={w.image}
                      alt={w.alt}
                      loading="lazy"
                      width={1400}
                      height={800}
                    />
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
                      <a
                        className="rh-link"
                        href={w.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {w.hrefLabel ?? "See it live"}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rh-work-empty">
              <p className="rh-work-empty__mark" aria-hidden="true">
                ✦
              </p>
              <p>
                <b>We only publish work we have permission to share.</b>
              </p>
              <p>
                Case studies are on the way — here&rsquo;s what we build
                meanwhile.
              </p>
              <a className="rh-btn rh-btn--tomato" href="#services">
                See what we build
              </a>
            </div>
          )}
        </section>

        <section
          className="rh-section"
          id="services"
          aria-labelledby="services-h"
        >
          <div className="rh-section__head">
            <p className="rh-kicker">One stop</p>
            <h2 id="services-h" className="rh-h2">
              Whatever you need. One shop.
            </h2>
          </div>
          <ul className="rh-whatever">
            {WHATEVER.map((w) => (
              <li
                key={w.title}
                className={`rh-whatever__tile rh-whatever__tile--${w.tone}`}
              >
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rh-section rh-section--tint"
          id="process"
          aria-labelledby="process-h"
        >
          <div className="rh-section__head">
            <p className="rh-kicker">How it works</p>
            <h2 id="process-h" className="rh-h2">
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

        <section className="rh-section" id="price" aria-labelledby="price-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Pricing</p>
            <h2 id="price-h" className="rh-h2">
              Cheap enough to just try.
            </h2>
            <p className="rh-sub">
              No hourly meter. You know the price before we start.
            </p>
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
              {hasPhone ? (
                <CallButton className="rh-btn--block" />
              ) : (
                <BookButton className="rh-btn--block" />
              )}
            </article>
          </div>
        </section>

        <section className="rh-section" id="faq" aria-labelledby="faq-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Quick answers</p>
            <h2 id="faq-h" className="rh-h2">
              Fair questions
            </h2>
          </div>
          <div className="rh-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rh-final" aria-labelledby="final-h">
          <div className="rh-final__box">
            <h2 id="final-h" className="rh-h2 rh-h2--huge">
              Tell us what&rsquo;s eating your week.
            </h2>
            <p className="rh-sub">
              Free intro call. We&rsquo;ll tell you honestly if we can help.
            </p>
            <div className="rh-cta-row rh-cta-row--center">
              {hasPhone ? <CallButton /> : null}
              <BookButton primary={!hasPhone} />
              <a
                className="rh-btn rh-btn--white"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                <Mail size={18} strokeWidth={2.6} aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="rh-footer">
        <p>© {COPYRIGHT_YEAR} The Real Help, LLC · St. Louis, MO</p>
        <p>
          <a href="/">Home</a> · <a href="/privacy">Privacy</a> ·{" "}
          <a href="/terms">Terms</a>
        </p>
      </footer>

      <div className="rh-bar">
        {hasPhone ? <CallButton className="rh-btn--small" /> : null}
        <BookButton primary={!hasPhone} className="rh-btn--small" />
      </div>
    </div>
  );
}
