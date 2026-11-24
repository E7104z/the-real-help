import { useEffect } from "react";
import {
  SiteHeader,
  SiteFooter,
  MobileBar,
  CtaRow,
} from "./marketing/SiteChrome";
import { STEPS, WHATEVER } from "./home/content";
import { BUSINESS } from "@/lib/constants/business";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";

export default function StLouisPage() {
  useEffect(() => {
    document.title = "Custom Software & AI for St. Louis Small Business | The Real Help";
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <section className="rh-section">
          <p className="rh-sticker">St. Louis, MO</p>
          <h1 className="rh-h1">
            Custom software &amp; AI for{" "}
            <span className="rh-scribble">St. Louis</span> small business.
          </h1>
          <p className="rh-lede">
            {BUSINESS.legalName} is based in {BUSINESS.areaServed[0]}. We build
            websites, apps, AI and automation for the small businesses around
            us — fixed price, live in days.
          </p>
          <CtaRow />
          <p className="rh-fine">Local · Fixed prices · No jargon</p>
        </section>

        <section className="rh-section" id="services" aria-labelledby="services-h">
          <div className="rh-section__head">
            <p className="rh-kicker">What we build</p>
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

        <section className="rh-section rh-section--tint" id="process" aria-labelledby="process-h">
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
