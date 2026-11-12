import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { CONTACT_EMAIL } from '@/lib/constants/site';

export default function PortalLayout() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    void signOut().then(() => {
      void navigate('/portal/login', { replace: true, state: { signedOut: true } });
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-silver-50">
      {/* Header */}
      <header className="bg-brand-blue-500 shadow">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <Link to="/portal/dashboard" className="flex items-center gap-3">
              <img
                src="/images/Logo/Real%20Logo1.png"
                alt="The Real Help, LLC"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <span className="text-sm font-semibold text-white/80">Client Portal</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-white/70 sm:block">
              {currentUser?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-silver-200 bg-white py-4 text-center text-xs text-brand-silver-400">
        © {new Date().getFullYear()} The Real Help, LLC · St. Louis, Missouri ·{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-blue-500">
          {CONTACT_EMAIL}
        </a>
      </footer>
    </div>
  );
}
