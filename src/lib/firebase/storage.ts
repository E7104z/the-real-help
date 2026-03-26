import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseApp } from './app';

export const storage = getStorage(firebaseApp);

if (import.meta.env['VITE_USE_EMULATORS'] === 'true') {
  connectStorageEmulator(storage, 'localhost', 9199);
}
