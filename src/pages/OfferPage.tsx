import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/content/case-studies";
import { findOffer } from "@/content/offers";
import { COPYRIGHT_YEAR } from "@/lib/constants/site";
import LeadForm from "./home/LeadForm";
import { CallButton } from "./marketing/SiteChrome";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";
import "./offer.css";

/**
 * Isolated campaign landing page for a single offer. No nav, no Book/Email
 * buttons, no mobile action bar — the only conversion doors are the lead form
 * and a single call button.
 */
export default function OfferPage({ slug }: { slug: string }) {
  const offer = findOffer(slug);

  useEffect(() => {
    if (offer) document.title = offer.metaTitle;
  }, [offer]);

  if (!offer) {
    return (
      <div className="rh">
        <main id="main" className="rh-notfound">
          <h1 className="rh-h1">Page not found</h1>
          <p className="rh-lede">
            That page doesn&rsquo;t exist &mdash; but tell us what you&rsquo;re
            looking for and we can probably build it.
          </p>
          <a className="rh-btn rh-btn--tomato" href="/">
            Back to therealhelp.com
          </a>
        </main>
      </div>
    );
  }

  const source = `offer-${offer.slug}`;

  return (
    <div className="rh">
      {/* Brand mark only — deliberately not a link, no nav. */}
      <header className="rh-header">
        <div className="rh-brand">
          <span className="rh-brand__mark" aria-hidden="true">
            R
          </span>
          <span className="rh-brand__name">The Real Help</span>
        </div>
      </header>

      <main id="main">
        {/* Above the fold */}
        <section className="rh-offer-hero">
          <div className="rh-offer-hero__copy">
            <h1 className="rh-h1">{offer.headline}</h1>
            <p className="rh-lede">{offer.lede}</p>
            <p className="rh-offer-price">{offer.priceLine}</p>
          </div>
          <div className="rh-offer-hero__form">
            <LeadForm variant="offer" source={source} />
            <CallButton className="rh-btn--block" location="offer" />
          </div>
        </section>

        {/* Below the fold */}
        <section className="rh-section" aria-labelledby="offer-what-h">
          <div className="rh-section__head">
            <p className="rh-kicker">What you get</p>
            <h2 id="offer-what-h" className="rh-h2">
              The Quick Fix
            </h2>
          </div>
          <ul className="rh-ticks rh-ticks--offer">
            {offer.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {CASE_STUDIES.length ? (
          <section
            className="rh-section rh-section--ink"
            aria-labelledby="offer-work-h"
          >
            <div className="rh-section__head">
              <p className="rh-kicker rh-kicker--light">Proof</p>
              <h2 id="offer-work-h" className="rh-h2 rh-h2--light">
                Receipts, not promises.
              </h2>
            </div>
            <div className="rh-work">
              {CASE_STUDIES.slice(0, 2).map((w, i) => (
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
                        {w.hrefLabel ?? "See it live"}{" "}
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2.8}
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Bottom form */}
        <section className="rh-final" aria-labelledby="offer-final-h">
          <div className="rh-final__box">
            <h2 id="offer-final-h" className="rh-h2 rh-h2--huge">
              Tell us what&rsquo;s eating your week.
            </h2>
            <LeadForm variant="offer" source={source} />
          </div>
        </section>
      </main>

      {/* One-line legal footer — legal links stay. */}
      <footer className="rh-footer rh-footer--offer">
        <p>
          © {COPYRIGHT_YEAR} The Real Help, LLC · St. Louis, MO ·{" "}
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
        </p>
      </footer>
    </div>
  );
}
