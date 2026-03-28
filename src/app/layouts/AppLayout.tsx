import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  FolderOpen,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Records', path: ROUTES.RECORDS, icon: FileText },
  { label: 'Workflows', path: ROUTES.WORKFLOWS, icon: GitBranch },
  { label: 'Files', path: ROUTES.FILES, icon: FolderOpen },
];

export function AppLayout() {
  const { currentUser, role, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface-secondary">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-brand-black transition-transform duration-200 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center px-6">
          <span className="font-heading text-xl font-bold text-white">
            The Real Help
          </span>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => { setMobileOpen(false); }}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-blue text-white'
                    : 'text-brand-silver-400 hover:bg-brand-silver-900 hover:text-white',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              to={ROUTES.ADMIN}
              onClick={() => { setMobileOpen(false); }}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                location.pathname.startsWith(ROUTES.ADMIN)
                  ? 'bg-accent-blue text-white'
                  : 'text-brand-silver-400 hover:bg-brand-silver-900 hover:text-white',
              )}
            >
              <Shield className="h-5 w-5" />
              Admin
            </Link>
          )}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-brand-silver-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-accent-blue flex items-center justify-center text-white text-sm font-bold">
              {currentUser?.displayName?.charAt(0) ?? currentUser?.email?.charAt(0) ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-white">
                {currentUser?.displayName ?? currentUser?.email}
              </p>
              <p className="text-2xs text-brand-silver-500 capitalize">{role ?? 'user'}</p>
            </div>
            <button
              onClick={() => void signOut()}
              className="text-brand-silver-500 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => { setMobileOpen(false); }}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b border-brand-silver-200 bg-white px-4 lg:px-6">
          <button
            onClick={() => { setMobileOpen(true); }}
            className="mr-4 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex-1" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
