import { createBrowserRouter, Navigate } from 'react-router-dom';
import MarketingLayout from '../layouts/MarketingLayout';
import { AppLayout } from '../layouts/AppLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import WorkPage from '../../pages/WorkPage';
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
import WebAppDevelopmentStLouis from '../../pages/local/WebAppDevelopmentStLouis';
import CdsComplianceMissouri from '../../pages/local/CdsComplianceMissouri';
import MwbeCertificationStLouis from '../../pages/local/MwbeCertificationStLouis';
import BusinessConsultantStLouis from '../../pages/local/BusinessConsultantStLouis';
import GovernmentContractingStLouis from '../../pages/local/GovernmentContractingStLouis';
import DbeCertificationMissouri from '../../pages/local/DbeCertificationMissouri';
import MbeCertificationMissouri from '../../pages/local/MbeCertificationMissouri';
import StartCdsAgencyMissouri from '../../pages/local/StartCdsAgencyMissouri';
import ArticleCdsEvvCompliance from '../../pages/blog/ArticleCdsEvvCompliance';
import ArticleMwbeCertGuide from '../../pages/blog/ArticleMwbeCertGuide';
import ArticleGoogleWorkspace from '../../pages/blog/ArticleGoogleWorkspace';
import ArticleWebAppStLouis from '../../pages/blog/ArticleWebAppStLouis';
import ArticleCapabilityStatement from '../../pages/blog/ArticleCapabilityStatement';
import ArticleMedicaidBillingErrors from '../../pages/blog/ArticleMedicaidBillingErrors';

// Programmatic SEO routes
import { certificationPages } from '../../data/seo/certificationRoutes';
import { contractPages } from '../../data/seo/contractRoutes';
import { cdsPages } from '../../data/seo/cdsPages';

export const router = createBrowserRouter([
  // ── Public / Marketing Pages ──────────────────────────────
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'work', element: <WorkPage /> },
      // Blog articles
      { path: 'blog/cds-evv-compliance-missouri', element: <ArticleCdsEvvCompliance /> },
      { path: 'blog/mwbe-certification-guide-st-louis', element: <ArticleMwbeCertGuide /> },
      { path: 'blog/google-workspace-automation', element: <ArticleGoogleWorkspace /> },
      { path: 'blog/web-app-development-st-louis', element: <ArticleWebAppStLouis /> },
      { path: 'blog/capability-statement-guide', element: <ArticleCapabilityStatement /> },
      { path: 'blog/medicaid-billing-errors', element: <ArticleMedicaidBillingErrors /> },
      // Local landing pages
      { path: 'st-louis/web-app-development', element: <WebAppDevelopmentStLouis /> },
      { path: 'missouri/cds-compliance-consulting', element: <CdsComplianceMissouri /> },
      { path: 'st-louis/mwbe-certification-assistance', element: <MwbeCertificationStLouis /> },
      { path: 'st-louis/business-consultant', element: <BusinessConsultantStLouis /> },
      // NEW local-intent SEO pages (canonical root-level + nested aliases)
      { path: 'government-contracting-consultant-st-louis', element: <GovernmentContractingStLouis /> },
      { path: 'dbe-certification-missouri', element: <DbeCertificationMissouri /> },
      { path: 'mbe-certification-missouri', element: <MbeCertificationMissouri /> },
      { path: 'start-a-cds-agency-missouri', element: <StartCdsAgencyMissouri /> },
      { path: 'st-louis/government-contracting-consultant', element: <GovernmentContractingStLouis /> },
      { path: 'missouri/dbe-certification', element: <DbeCertificationMissouri /> },
      { path: 'missouri/mbe-certification', element: <MbeCertificationMissouri /> },
      { path: 'missouri/start-a-cds-agency', element: <StartCdsAgencyMissouri /> },
      // Programmatic SEO – Certification pages (Set A, 12 pages)
      ...certificationPages,
      // Programmatic SEO – Win the Contract pages (Set B)
      ...contractPages,
      // Programmatic SEO – CDS pages (Set C)
      ...cdsPages,
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