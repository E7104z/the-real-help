import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import type { AuthContextValue, CustomClaims } from '@/types/auth';
import type { UserRole } from '@/lib/constants/roles';

export const AuthContext = createContext<AuthContextValue | null>(null);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      void (async () => {
        setCurrentUser(user);

        if (user) {
          const tokenResult = await user.getIdTokenResult();
          const claims = tokenResult.claims as unknown as CustomClaims;
          setRole(claims.role ?? null);
          setTenantId(claims.tenantId ?? null);

          // Firestore-based admin check
          const adminSnap = await getDoc(doc(firestore, 'admins', user.uid));
          setIsAdmin(adminSnap.exists() && adminSnap.data().isAdmin === true);
        } else {
          setRole(null);
          setTenantId(null);
          setIsAdmin(false);
        }

        setAuthLoading(false);
      })();
    });

    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const value: AuthContextValue = {
    currentUser,
    authLoading,
    role,
    tenantId,
    isAdmin,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
