import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { firebaseApp } from './app';

export const firestore = getFirestore(firebaseApp);

if (import.meta.env['VITE_USE_EMULATORS'] === 'true') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
