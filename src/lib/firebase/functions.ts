import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { firebaseApp } from './app';

export const functions = getFunctions(firebaseApp);

if (import.meta.env['VITE_USE_EMULATORS'] === 'true') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
