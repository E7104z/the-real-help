import { CalendarDays, Mail, Phone } from "lucide-react";
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE, PHONE_HREF } from "@/pages/home/content";
import { COPYRIGHT_YEAR } from "@/lib/constants/site";
import { trackEvent } from "@/lib/track";

const hasPhone = Boolean(CONTACT_PHONE && PHONE_HREF);

export function CallButton({
  className = "",
  location,
}: {
  className?: string;
  location: string;
}) {
  if (!hasPhone) return null;
  return (
    <a
      className={`rh-btn rh-btn--tomato ${className}`}
      href={PHONE_HREF}
      onClick={() => trackEvent("cta_click", { action: "call", location })}
    >
      <Phone size={18} strokeWidth={2.6} aria-hidden="true" />
      Call {CONTACT_PHONE}
    </a>
  );
}

export function BookButton({
  className = "",
  primary = false,
  location,
}: {
  className?: string;
  primary?: boolean;
  location: string;
}) {
  return (
    <a
      className={`rh-btn ${primary ? "rh-btn--tomato" : "rh-btn--white"} ${className}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_click", { action: "book", location })}
    >
      <CalendarDays size={18} strokeWidth={2.6} aria-hidden="true" />
      Book a free call
    </a>
  );
}

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="rh-header">
      <a className="rh-brand" href="/" aria-label="The Real Help, home">
        <span className="rh-brand__mark" aria-hidden="true">
          R
        </span>
        <span className="rh-brand__name">The Real Help</span>
      </a>
      <nav className="rh-nav" aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      {hasPhone ? (
        <CallButton className="rh-btn--small" location="header" />
      ) : (
        <BookButton primary className="rh-btn--small" location="header" />
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="rh-footer">
      <p>© {COPYRIGHT_YEAR} The Real Help, LLC · St. Louis, MO</p>
      <p>
        <a href="/">Home</a> · <a href="/services">Services</a> ·{" "}
        <a href="/pricing">Pricing</a> · <a href="/work">Work</a> ·{" "}
        <a href="/about">About</a> · <a href="/privacy">Privacy</a> ·{" "}
        <a href="/terms">Terms</a>
      </p>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="rh-bar">
      {hasPhone ? <CallButton className="rh-btn--small" location="mobile_bar" /> : null}
      <BookButton primary={!hasPhone} className="rh-btn--small" location="mobile_bar" />
    </div>
  );
}

export function CtaRow({ center = false, withEmail = false }: { center?: boolean; withEmail?: boolean }) {
  return (
    <div className={`rh-cta-row ${center ? "rh-cta-row--center" : ""}`}>
      {hasPhone ? <CallButton location="final" /> : null}
      <BookButton primary={!hasPhone} location="final" />
      {withEmail ? <EmailButton location="final" /> : null}
    </div>
  );
}

export function PriceCardCta({ primary = false }: { primary?: boolean }) {
  if (primary) return <BookButton primary className="rh-btn--block" location="price_quick" />;
  return hasPhone ? (
    <CallButton className="rh-btn--block" location="price_custom" />
  ) : (
    <BookButton className="rh-btn--block" location="price_custom" />
  );
}

export function EmailButton({
  className = "",
  location,
}: {
  className?: string;
  location: string;
}) {
  return (
    <a
      className={`rh-btn rh-btn--white ${className}`}
      href={`mailto:${CONTACT_EMAIL}`}
      onClick={() => trackEvent("cta_click", { action: "email", location })}
    >
      <Mail size={18} strokeWidth={2.6} aria-hidden="true" />
      Email us
    </a>
  );
}
