import { CalendarDays, Mail, Phone } from "lucide-react";
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE, PHONE_HREF } from "@/pages/home/content";
import { COPYRIGHT_YEAR } from "@/lib/constants/site";

const hasPhone = Boolean(CONTACT_PHONE && PHONE_HREF);

export function CallButton({ className = "" }: { className?: string }) {
  if (!hasPhone) return null;
  return (
    <a className={`rh-btn rh-btn--tomato ${className}`} href={PHONE_HREF}>
      <Phone size={18} strokeWidth={2.6} aria-hidden="true" />
      Call {CONTACT_PHONE}
    </a>
  );
}

export function BookButton({
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
        <CallButton className="rh-btn--small" />
      ) : (
        <BookButton primary className="rh-btn--small" />
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
      {hasPhone ? <CallButton className="rh-btn--small" /> : null}
      <BookButton primary={!hasPhone} className="rh-btn--small" />
    </div>
  );
}

export function CtaRow({ center = false, withEmail = false }: { center?: boolean; withEmail?: boolean }) {
  return (
    <div className={`rh-cta-row ${center ? "rh-cta-row--center" : ""}`}>
      {hasPhone ? <CallButton /> : null}
      <BookButton primary={!hasPhone} />
      {withEmail ? <EmailButton /> : null}
    </div>
  );
}

export function PriceCardCta({ primary = false }: { primary?: boolean }) {
  if (primary) return <BookButton primary className="rh-btn--block" />;
  return hasPhone ? (
    <CallButton className="rh-btn--block" />
  ) : (
    <BookButton className="rh-btn--block" />
  );
}

export function EmailButton({ className = "" }: { className?: string }) {
  return (
    <a className={`rh-btn rh-btn--white ${className}`} href={`mailto:${CONTACT_EMAIL}`}>
      <Mail size={18} strokeWidth={2.6} aria-hidden="true" />
      Email us
    </a>
  );
}
