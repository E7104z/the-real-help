import { useEffect } from "react";
import {
  SiteHeader,
  SiteFooter,
  MobileBar,
  CtaRow,
} from "./marketing/SiteChrome";
import { CHORES, STEPS, WHATEVER } from "./home/content";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services | The Real Help | Custom Software, AI & Automation";
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <section className="rh-section">
          <p className="rh-sticker">Services</p>
          <h1 className="rh-h1">
            Custom software, AI and{" "}
            <span className="rh-scribble">automation.</span>
          </h1>
          <p className="rh-lede">
            One shop for the tools that run a small business: websites that
            sell, apps and portals, AI assistants, and the busywork that
            finally does itself.
          </p>
          <CtaRow />
          <p className="rh-fine">St. Louis, MO · Fixed prices · Live in days</p>
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

        <section className="rh-section rh-section--tint" id="chores" aria-labelledby="chores-h">
          <div className="rh-section__head">
            <p className="rh-kicker">The chores we kill</p>
            <h2 id="chores-h" className="rh-h2">
              Hours back, every week.
            </h2>
            <p className="rh-sub">
              If it&rsquo;s a repeatable chore that eats your week, we&rsquo;ve
              probably automated something like it.
            </p>
          </div>
          <ul className="rh-ticks">
            {CHORES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="rh-section" id="process" aria-labelledby="process-h">
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
