import { Link, Outlet } from 'react-router-dom';

/**
 * Minimal wrapper for the few non-marketing public pages
 * (privacy, terms, client portal login, property transfer).
 */
export default function SimpleLayout() {
  return (
    <div className="min-h-screen bg-white text-brand-black">
      <header className="border-b border-brand-silver-200">
        <div className="page-container flex h-14 items-center justify-between">
          <Link to="/" className="font-heading text-lg font-bold">
            The Real Help
          </Link>
          <Link to="/" className="text-sm text-brand-silver-600 hover:text-brand-black">
            ← Back to site
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
