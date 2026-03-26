import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppProviders } from '@/app/providers';
import { AppRouter } from '@/app/router';
import '@/styles/index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <HelmetProvider>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </HelmetProvider>
  </StrictMode>,
);
