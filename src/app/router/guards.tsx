import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { hasMinimumRole, ROLES, type UserRole } from '@/lib/constants/roles';
import { ROUTES } from '@/lib/constants/routes';
import { Spinner } from '@/components/ui/Spinner';

interface GuardProps {
  children: ReactNode;
}

interface RoleGuardProps extends GuardProps {
  minimumRole: UserRole;
}

export function AuthenticatedGuard({ children }: GuardProps) {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function RoleGuard({ children, minimumRole }: RoleGuardProps) {
  const { role, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!role || !hasMinimumRole(role, minimumRole)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyGuard({ children }: GuardProps) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}

/** Allows only users with role === 'client'. Redirects others appropriately. */
export function ClientGuard({ children }: GuardProps) {
  const { currentUser, role, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to={ROUTES.PORTAL_LOGIN} state={{ from: location }} replace />;
  }

  if (role === ROLES.ADMIN || role === ROLES.STAFF) {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  if (role !== ROLES.CLIENT) {
    return <Navigate to={ROUTES.PORTAL_LOGIN} replace />;
  }

  return <>{children}</>;
}

