import { StrictMode } from 'react';
import type { ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import '@/styles/index.css';

inject();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

/**
 * Marketing routes are pre-rendered at build time and shipped as full HTML.
 * They are hydrated in place with hydrateRoot (no wipe → no layout shift).
 * The app shell, admin and portal stay client-rendered with createRoot.
 */
type MarketingLoader = () => Promise<{ default: ComponentType }>;

const MARKETING_LOADERS: Record<string, MarketingLoader> = {
  '/': () => import('@/pages/HomePage'),
  '/privacy': () => import('@/pages/PrivacyPolicyPage'),
  '/terms': () => import('@/pages/TermsPage'),
};

const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const loadMarketing = MARKETING_LOADERS[pathname];

if (loadMarketing) {
  void loadMarketing().then(({ default: Component }) => {
    const page = (
      <StrictMode>
        <Component />
      </StrictMode>
    );
    if (rootEl.hasChildNodes()) {
      hydrateRoot(rootEl, page);
    } else {
      createRoot(rootEl).render(page);
    }
  });
} else {
  void import('./AppRoot').then(({ default: AppRoot }) => {
    createRoot(rootEl).render(
      <StrictMode>
        <AppRoot />
      </StrictMode>,
    );
  });
}
