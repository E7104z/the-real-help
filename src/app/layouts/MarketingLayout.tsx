import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="bg-brand-black py-2 text-center text-xs text-brand-silver-400">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4">
          <a href="mailto:info@therealhelp.com" className="inline-flex items-center gap-1 hover:text-white transition-colors">
            <Mail className="h-3 w-3" />
            info@therealhelp.com
          </a>
          <a href="tel:+13146602890" className="inline-flex items-center gap-1 hover:text-white transition-colors">
            <Phone className="h-3 w-3" />
            (314) 660-2890
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
              href="https://calendar.app.google/ubdfXKUbazhjgs2VA"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-brand-blue-500 px-5 py-2.5 text-sm font-bold text-brand-blue-500 hover:bg-brand-blue-50 transition-colors"
            >
              Book a Call
            </a>
            <Link
              to="/contact"
              className="rounded-lg bg-brand-blue-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors"
            >
              Let&apos;s Talk
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
              Let&apos;s Talk
            </Link>
            <a
              href="https://calendar.app.google/ubdfXKUbazhjgs2VA"
              target="_blank"
              rel="noopener noreferrer"
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
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-silver-400 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-silver-300">
                <li><a href="mailto:info@therealhelp.com" className="hover:text-white transition-colors">info@therealhelp.com</a></li>
                <li><a href="tel:+13146602890" className="hover:text-white transition-colors">(314) 660-2890</a></li>
                <li className="text-brand-silver-500">St. Louis, Missouri</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-brand-silver-800 pt-6 text-center text-xs text-brand-silver-500">
            © {new Date().getFullYear()} The Real Help, LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
