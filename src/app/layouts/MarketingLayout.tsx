import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Mail, ChevronDown } from 'lucide-react';
import { CONTACT_EMAIL, BOOKING_URL, isExternalUrl } from '@/lib/constants/site';

const SERVICES_DROPDOWN = [
  { label: 'MWBE Certification', path: '/st-louis/mwbe-certification-assistance' },
  { label: 'DBE Certification Missouri', path: '/dbe-certification-missouri' },
  { label: 'MBE Certification Missouri', path: '/mbe-certification-missouri' },
  { label: 'Government Contracting', path: '/government-contracting-consultant-st-louis' },
  { label: 'CDS Compliance', path: '/missouri/cds-compliance-consulting' },
  { label: 'Start a CDS Agency', path: '/start-a-cds-agency-missouri' },
  { label: 'Business Consulting', path: '/st-louis/business-consultant' },
  { label: 'Web App Development', path: '/st-louis/web-app-development' },
];

const NAV_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
  { label: 'Client Portal', to: '/portal/login' },
];

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="bg-brand-black py-2 text-center text-xs text-brand-silver-400">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1 hover:text-white transition-colors">
            <Mail className="h-3 w-3" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-brand-silver-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-24">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/Logo/Real%20Logo1.png"
              alt="The Real Help, LLC"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-blue-500 ${
                  pathname.startsWith('/st-louis/') || pathname.startsWith('/missouri/') || pathname.startsWith('/dbe-') || pathname.startsWith('/mbe-') || pathname.startsWith('/government-') || pathname.startsWith('/start-a-')
                    ? 'text-brand-blue-500'
                    : 'text-brand-silver-600'
                }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-brand-silver-200 rounded-lg shadow-lg py-2 z-50">
                  {SERVICES_DROPDOWN.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm hover:bg-brand-blue-50 transition-colors ${
                        pathname === item.path ? 'text-brand-blue-500 font-semibold' : 'text-brand-silver-600'
                      }`}
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors hover:text-brand-blue-500 ${
                  pathname.startsWith(link.to) ? 'text-brand-blue-500' : 'text-brand-silver-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target={isExternalUrl(BOOKING_URL) ? '_blank' : undefined}
              rel={isExternalUrl(BOOKING_URL) ? 'noopener noreferrer' : undefined}
              className="rounded-lg border border-brand-blue-500 px-5 py-2.5 text-sm font-bold text-brand-blue-500 hover:bg-brand-blue-50 transition-colors"
            >
              Book a Call
            </a>
            <Link
              to="/contact"
              className="rounded-lg bg-brand-blue-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors"
            >
              Let's Talk
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-brand-silver-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-silver-200 bg-white px-4 py-4 space-y-3">
            {/* Mobile services dropdown */}
            <details className="group">
              <summary className="flex items-center justify-between text-base font-semibold text-brand-silver-700 py-1 cursor-pointer">
                Services
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="ml-4 mt-2 space-y-2 pb-2">
                {SERVICES_DROPDOWN.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-brand-silver-600 hover:text-brand-blue-500 py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-base font-semibold text-brand-silver-700 hover:text-brand-blue-500 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block rounded-lg bg-brand-blue-500 px-5 py-3 text-center text-sm font-bold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Let's Talk
            </Link>
            <a
              href={BOOKING_URL}
              target={isExternalUrl(BOOKING_URL) ? '_blank' : undefined}
              rel={isExternalUrl(BOOKING_URL) ? 'noopener noreferrer' : undefined}
              className="block rounded-lg border border-brand-blue-500 px-5 py-3 text-center text-sm font-bold text-brand-blue-500"
              onClick={() => setMobileOpen(false)}
            >
              Book a Call
            </a>
          </div>
        )}
      </header>

      {/* Trust bar */}
      <div className="bg-brand-blue-500 py-2 text-center text-xs font-medium text-white">
        🤝 Flexible pricing &middot; No long-term contracts &middot; You work directly with Jason — always.
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="col-span-1">
              <img
                src="/images/Logo/Real%20Logo1.png"
                alt="The Real Help, LLC"
                className="h-32 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-4 text-sm text-brand-silver-400 leading-relaxed">
                St. Louis-Based. Business services for owners who need real solutions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-silver-400 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-brand-silver-300">
                <li><Link to="/services" className="hover:text-white transition-colors">Compliance & Certification</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Business Systems</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">App Development</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">AI & Automation</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Branding & Design</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-silver-400 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-brand-silver-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/work" className="hover:text-white transition-colors">Work</Link></li>
                <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/portal/login" className="hover:text-white transition-colors">Client Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-silver-400 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-silver-300">
                <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">{CONTACT_EMAIL}</a></li>
                <li className="text-brand-silver-500">St. Louis, Missouri</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-brand-silver-800 pt-6 text-center text-xs text-brand-silver-500 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} The Real Help, LLC. All rights reserved.</span>
            <span className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}