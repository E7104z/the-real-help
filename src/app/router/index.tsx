import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import HomePage from '../../pages/HomePage';
import WorkPage from '../../pages/WorkPage';
import ServicesPage from '../../pages/ServicesPage';
import PricingPage from '../../pages/PricingPage';
import AboutPage from '../../pages/AboutPage';
import StLouisPage from '../../pages/StLouisPage';
import SimpleLayout from '../layouts/SimpleLayout';
import LoginPage from '../../features/auth/LoginPage';
import DashboardPage from '../../features/dashboard/DashboardPage';
import RecordsListPage from '../../features/records/RecordsListPage';
import RecordDetailPage from '../../features/records/RecordDetailPage';
import FilesPage from '../../features/files/FilesPage';
import { AuthenticatedGuard, AdminGuard } from './guards';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import ClientManager from '../../features/admin/ClientManager';
import ClientDetailPage from '../../features/admin/ClientDetailPage';
import PropertyTransfer from '../../pages/PropertyTransfer';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';
import TermsPage from '../../pages/TermsPage';
import AuditLogPage from '../../features/admin/AuditLogPage';
import PortalLoginPage from '../../features/portal/PortalLoginPage';
import PortalDashboard from '../../features/portal/PortalDashboard';


export const router = createBrowserRouter([
  // ── Public site ───────────────────────────────────────────
  { path: '/', element: <HomePage /> },
  { path: '/work', element: <WorkPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/st-louis', element: <StLouisPage /> },
  {
    element: <SimpleLayout />,
    children: [
      // Public-facing portal login
      { path: 'portal/login', element: <PortalLoginPage /> },
      { path: 'portal/dashboard', element: <PortalDashboard /> },
      { path: 'property-transfer', element: <PropertyTransfer /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsPage /> },
    ],
  },
  // ── Authenticated App Pages ────────────────────────────────
  {
    path: '/app',
    element: (
      <AuthenticatedGuard>
        <AppLayout />
      </AuthenticatedGuard>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'records', element: <RecordsListPage /> },
      { path: 'records/:id', element: <RecordDetailPage /> },
      { path: 'files', element: <FilesPage /> },
    ],
  },
  // ── Admin Pages ───────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      { path: 'clients', element: <ClientManager /> },
      { path: 'clients/:clientId', element: <ClientDetailPage /> },
      { path: 'audit-log', element: <AuditLogPage /> },
    ],
  },
  // ── Misc ──────────────────────────────────────────────────
  { path: '/login', element: <LoginPage /> },
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

import { RouterProvider } from 'react-router-dom';

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default router;