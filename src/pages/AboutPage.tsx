import { useEffect } from "react";
import {
  SiteHeader,
  SiteFooter,
  MobileBar,
  CtaRow,
} from "./marketing/SiteChrome";
import { STEPS } from "./home/content";
import { BUSINESS } from "@/lib/constants/business";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/permanent-marker/400.css";
import "./home/home.css";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About | The Real Help | Custom Software & AI for Small Business";
  }, []);

  return (
    <div className="rh">
      <a className="rh-skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <section className="rh-section">
          <p className="rh-sticker">About</p>
          <h1 className="rh-h1">
            The real help for the <span className="rh-scribble">real stuff.</span>
          </h1>
          <p className="rh-lede">
            {BUSINESS.legalName} builds {BUSINESS.description.toLowerCase()} —
            the tools that run a business without you retyping everything by
            hand.
          </p>
          <CtaRow />
          <p className="rh-fine">
            {BUSINESS.areaServed[0]} · Founded by {BUSINESS.founder}
          </p>
        </section>

        <section className="rh-section rh-section--tint" id="why" aria-labelledby="why-h">
          <div className="rh-section__head">
            <p className="rh-kicker">Why we exist</p>
            <h2 id="why-h" className="rh-h2">
              Small business, minus the busywork.
            </h2>
          </div>
          <p className="rh-sub">
            Most small businesses run on a handful of chores that eat hours
            every week. The Real Help turns those chores into tools — built in
            weeks, at a fixed price, with no tech jargon.
          </p>
        </section>

        <section className="rh-section" id="process" aria-labelledby="process-h">
          <div className="rh-section__head">
            <p className="rh-kicker">How we work</p>
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
