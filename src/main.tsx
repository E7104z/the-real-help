import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import '@/styles/index.css';

inject();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');
const root = createRoot(rootEl);

/**
 * The public homepage is a standalone page. It must not depend on Firebase/auth,
 * so it is rendered without the app shell. Every other route (portal, admin,
 * login, privacy, terms) loads the full app on demand.
 */
const isHome = window.location.pathname === '/' || window.location.pathname === '';

if (isHome) {
  void import('@/pages/HomePage').then(({ default: HomePage }) => {
    root.render(
      <StrictMode>
        <HomePage />
      </StrictMode>,
    );
  });
} else {
  void import('./AppRoot').then(({ default: AppRoot }) => {
    root.render(
      <StrictMode>
        <AppRoot />
      </StrictMode>,
    );
  });
}
