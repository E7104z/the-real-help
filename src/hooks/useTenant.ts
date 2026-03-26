import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthProvider';

export function useTenant(): { tenantId: string | null } {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useTenant must be used within AuthProvider');
  }
  return { tenantId: ctx.tenantId };
}
