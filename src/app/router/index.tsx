import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthenticatedGuard, RoleGuard, PublicOnlyGuard } from './guards';
import { AppLayout } from '@/app/layouts/AppLayout';
import { AdminLayout } from '@/app/layouts/AdminLayout';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import MarketingLayout from '@/app/layouts/MarketingLayout';
import { Spinner } from '@/components/ui/Spinner';
import { ROLES } from '@/lib/constants/roles';

// Lazy-loaded pages
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const RecordsListPage = lazy(() => import('@/features/records/RecordsListPage'));
const RecordDetailPage = lazy(() => import('@/features/records/RecordDetailPage'));
const WorkflowsPage = lazy(() => import('@/features/workflows/WorkflowsPage'));
const FilesPage = lazy(() => import('@/features/files/FilesPage'));
const AdminDashboard = lazy(() => import('@/features/admin/AdminDashboard'));
const SettingsPage = lazy(() => import('@/features/admin/SettingsPage'));
const AuditLogPage = lazy(() => import('@/features/admin/AuditLogPage'));

// Marketing pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const WorkPage = lazy(() => import('@/pages/WorkPage'));
const InsightsPage = lazy(() => import('@/pages/InsightsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

// Local SEO pages
const BusinessConsultantStLouis = lazy(() => import('@/pages/local/BusinessConsultantStLouis'));
const MwbeCertificationStLouis = lazy(() => import('@/pages/local/MwbeCertificationStLouis'));
const CdsComplianceMissouri = lazy(() => import('@/pages/local/CdsComplianceMissouri'));
const WebAppDevelopmentStLouis = lazy(() => import('@/pages/local/WebAppDevelopmentStLouis'));

// Blog articles
const ArticleMwbeCertGuide = lazy(() => import('@/pages/blog/ArticleMwbeCertGuide'));
const ArticleCdsEvvCompliance = lazy(() => import('@/pages/blog/ArticleCdsEvvCompliance'));
const ArticleWebAppStLouis = lazy(() => import('@/pages/blog/ArticleWebAppStLouis'));
const ArticleGoogleWorkspace = lazy(() => import('@/pages/blog/ArticleGoogleWorkspace'));
const ArticleCapabilityStatement = lazy(() => import('@/pages/blog/ArticleCapabilityStatement'));
const ArticleMedicaidBillingErrors = lazy(() => import('@/pages/blog/ArticleMedicaidBillingErrors'));

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Marketing routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Local SEO pages */}
          <Route path="/business-consultant-st-louis" element={<BusinessConsultantStLouis />} />
          <Route path="/mwbe-certification-st-louis" element={<MwbeCertificationStLouis />} />
          <Route path="/cds-compliance-missouri" element={<CdsComplianceMissouri />} />
          <Route path="/web-app-development-st-louis" element={<WebAppDevelopmentStLouis />} />

          {/* Blog articles */}
          <Route path="/insights/mwbe-certification-st-louis-guide" element={<ArticleMwbeCertGuide />} />
          <Route path="/insights/cds-evv-compliance-missouri-2026" element={<ArticleCdsEvvCompliance />} />
          <Route path="/insights/affordable-web-app-development-st-louis" element={<ArticleWebAppStLouis />} />
          <Route path="/insights/google-workspace-small-business" element={<ArticleGoogleWorkspace />} />
          <Route path="/insights/capability-statement-guide" element={<ArticleCapabilityStatement />} />
          <Route path="/insights/medicaid-billing-errors" element={<ArticleMedicaidBillingErrors />} />
        </Route>

        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <PublicOnlyGuard>
                <LoginPage />
              </PublicOnlyGuard>
            }
          />
        </Route>

        {/* Authenticated app routes */}
        <Route
          path="/app"
          element={
            <AuthenticatedGuard>
              <AppLayout />
            </AuthenticatedGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="records" element={<RecordsListPage />} />
          <Route path="records/:recordId" element={<RecordDetailPage />} />
          <Route path="workflows" element={<WorkflowsPage />} />
          <Route path="files" element={<FilesPage />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AuthenticatedGuard>
              <RoleGuard minimumRole={ROLES.ADMIN}>
                <AdminLayout />
              </RoleGuard>
            </AuthenticatedGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="audit" element={<AuditLogPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
