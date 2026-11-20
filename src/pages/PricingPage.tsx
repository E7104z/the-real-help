import { useEffect } from "react";
import {
  SiteHeader,
  SiteFooter,
  MobileBar,
  CtaRow,
  PriceCardCta,
} from "./marketing/SiteChrome";
import { FAQ, PRICE_MONTHLY, PRICE_START } from "./home/content";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing | The Real Help | Fixed Price, No Hourly Meter";
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <section className="rh-section">
          <p className="rh-sticker">Pricing</p>
          <h1 className="rh-h1">
            Fixed prices. <span className="rh-scribble">No hourly meter.</span>
          </h1>
          <p className="rh-lede">
            You know the price before we start. Two ways to work with us —
            start with one real chore, or get a fixed quote for something
            bigger.
          </p>
          <CtaRow />
          <p className="rh-fine">St. Louis, MO · Agreed before we start</p>
        </section>

        <section className="rh-section" id="price" aria-labelledby="price-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Pricing</p>
            <h2 id="price-h" className="rh-h2">
              Cheap enough to just try.
            </h2>
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
              <PriceCardCta primary />
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
              <PriceCardCta />
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
            <CtaRow center withEmail />
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileBar />
    </div>
  );
}
