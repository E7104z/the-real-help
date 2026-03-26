import type { User } from 'firebase/auth';
import type { UserRole } from '@/lib/constants/roles';

export interface AuthState {
  currentUser: User | null;
  authLoading: boolean;
  role: UserRole | null;
  tenantId: string | null;
}

export interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface CustomClaims {
  role?: UserRole;
  tenantId?: string;
}
