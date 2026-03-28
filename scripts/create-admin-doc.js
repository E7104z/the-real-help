/**
 * Creates the admin Firestore document for a given UID.
 *
 * Usage (run from project root):
 *   node scripts/create-admin-doc.js <USER_UID>
 *
 * Prerequisites:
 *   scripts/service-account.json must exist (download from Firebase Console
 *   → Project Settings → Service accounts → Generate new private key)
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('ERROR: scripts/service-account.json not found.');
  process.exit(1);
}

const uid = process.argv[2];
if (!uid) {
  console.error('Usage: node scripts/create-admin-doc.js <USER_UID>');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

admin
  .firestore()
  .collection('admins')
  .doc(uid)
  .set({ isAdmin: true }, { merge: true })
  .then(() => {
    console.log(`✅  admins/${uid} created with isAdmin: true`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
