import { Outlet, Link, useLocation } from 'react-router-dom';
import { Settings, ScrollText, LayoutDashboard, ArrowLeft, FileStack } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

const ADMIN_NAV = [
  { label: 'Overview', path: ROUTES.ADMIN, icon: LayoutDashboard, exact: true },
  { label: 'Property Transfers', path: ROUTES.ADMIN_PROPERTY_TRANSFERS, icon: FileStack },
  { label: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: Settings },
  { label: 'Audit Log', path: ROUTES.ADMIN_AUDIT, icon: ScrollText },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-surface-secondary">
      <aside className="hidden w-64 border-r border-brand-silver-200 bg-white lg:block">
        <div className="flex h-16 items-center px-6">
          <span className="font-heading text-lg font-bold text-brand-black">Admin</span>
        </div>

        <nav className="mt-2 space-y-1 px-3">
          {ADMIN_NAV.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-blue-500 text-white'
                    : 'text-brand-silver-600 hover:bg-brand-silver-100 hover:text-brand-black',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 px-3">
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-brand-silver-500 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b border-brand-silver-200 bg-white px-6">
          <Link to={ROUTES.DASHBOARD} className="mr-4 lg:hidden text-brand-silver-500">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-heading text-lg font-bold">Administration</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
