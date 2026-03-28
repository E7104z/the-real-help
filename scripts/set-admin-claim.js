/**
 * One-time script to set the admin role claim on a Firebase user.
 *
 * Usage (run from the project root):
 *   node scripts/set-admin-claim.js <USER_UID>
 *
 * Prerequisites:
 *   1. Download a service account key from Firebase Console:
 *      Project Settings → Service accounts → Generate new private key
 *   2. Save it as scripts/service-account.json  (already git-ignored)
 *   3. Install firebase-admin locally if not already:
 *      npm install --prefix scripts firebase-admin
 *   3. Run: node scripts/set-admin-claim.js <UID_FROM_FIREBASE_AUTH_CONSOLE>
 *
 * After running, the user must sign out and sign back in to refresh their token.
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('ERROR: scripts/service-account.json not found.');
  console.error('Download it from Firebase Console → Project Settings → Service accounts.');
  process.exit(1);
}

const uid = process.argv[2];
if (!uid) {
  console.error('Usage: node scripts/set-admin-claim.js <USER_UID>');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

admin
  .auth()
  .setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log(`✅  Admin claim set for uid: ${uid}`);
    console.log('    Sign out and back in to refresh the token.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to set claim:', err.message);
    process.exit(1);
  });
