import { AppProviders } from '@/app/providers';
import { AppRouter } from '@/app/router';

/** Full application shell (auth, router, portal/admin). Loaded only for non-home routes. */
export default function AppRoot() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
