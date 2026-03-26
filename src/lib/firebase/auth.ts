import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { firebaseApp } from './app';

export const auth = getAuth(firebaseApp);

if (import.meta.env['VITE_USE_EMULATORS'] === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}
