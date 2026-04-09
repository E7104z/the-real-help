import { useState, useEffect, type FormEvent } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { ROUTES } from '@/lib/constants/routes';
import { ROLES } from '@/lib/constants/roles';
import { Loader2 } from 'lucide-react';

export default function PortalLoginPage() {
  const { signIn, signOut, currentUser, role, isAdmin, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const signedOut = (location.state as { signedOut?: boolean } | null)?.signedOut === true;

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && currentUser) {
      if (isAdmin || role === ROLES.STAFF) {
        void navigate(ROUTES.ADMIN, { replace: true });
      } else if (role === ROLES.CLIENT) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
        void navigate(from ?? ROUTES.PORTAL_DASHBOARD, { replace: true });
      } else {
        // Signed in but has no client role — sign out and show a clear error
        void signOut();
        setError('This account is not set up for client portal access. Contact Jason for help.');
      }
    }
  }, [authLoading, currentUser, role, isAdmin, navigate, location, signOut]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');
    try {
      await signIn(email, password);
      // redirect handled by useEffect above
    } catch {
      setError('Incorrect email or password. Check your inbox for a setup link if this is your first sign-in.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email address above, then click "Forgot password?".');
      return;
    }
    setResetLoading(true);
    setError('');
    setResetMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent — check your inbox.');
    } catch {
      setResetMessage('If that email is registered, a reset link has been sent.');
    } finally {
      setResetLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-silver-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-silver-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img
            src="/images/Logo/Real%20Logo1.png"
            alt="The Real Help, LLC"
            className="mx-auto h-16 w-auto object-contain"
          />
          <h1 className="mt-4 font-heading text-2xl font-bold text-brand-black">
            Client Portal
          </h1>
          <p className="mt-1 text-sm text-brand-silver-500">
            Sign in to view your project status and documents.
          </p>
        </div>

        {signedOut && (
          <p className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            You&apos;ve been signed out successfully.
          </p>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-brand-silver-200">
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-black mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
                className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-brand-black">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => void handleForgotPassword()}
                  disabled={resetLoading}
                  className="text-xs text-brand-blue-500 hover:underline disabled:opacity-50"
                >
                  {resetLoading ? 'Sending…' : 'Forgot password?'}
                </button>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                className="w-full rounded-xl border border-brand-silver-300 px-4 py-3 text-brand-black placeholder:text-brand-silver-400 focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {resetMessage && (
              <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {resetMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-brand-silver-400">
            Need help?{' '}
            <a href="mailto:info@therealhelp.com" className="text-brand-blue-500 hover:underline">
              Contact Jason
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
