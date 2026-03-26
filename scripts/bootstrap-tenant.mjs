/**
 * Bootstrap script — creates a tenant doc and sets admin custom claims
 * on a Firebase Auth user.
 *
 * Usage:
 *   1. Start emulators:  npm run emulators
 *   2. In another terminal: node scripts/bootstrap-tenant.mjs
 *
 *   OR against production (careful!):
 *     FIREBASE_PROJECT_ID=the-real-help node scripts/bootstrap-tenant.mjs
 */

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ── Config ──────────────────────────────────────────────────────────
const USE_EMULATORS = !process.env.FIREBASE_PROJECT_ID;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'the-real-help';

// The email of the user you want to make admin
// Change this to YOUR email address
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

// Tenant info
const TENANT_ID = 'main';
const TENANT_NAME = 'The Real Help, LLC';

// ── Setup ───────────────────────────────────────────────────────────
if (USE_EMULATORS) {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  console.log('🔧 Using Firebase Emulators');
}

const app = initializeApp({ projectId: PROJECT_ID });
const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  console.log('\n── Bootstrap: The Real Help, LLC ──\n');

  // Step 1: Create or get the admin user
  let user;

  if (ADMIN_EMAIL) {
    try {
      user = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ Found existing user: ${user.email} (${user.uid})`);
    } catch {
      console.log(`⚠️  User ${ADMIN_EMAIL} not found.`);
      console.log('   Sign in through the app first, then re-run this script.');
      console.log('   Or set ADMIN_EMAIL to an existing user\'s email.\n');

      if (USE_EMULATORS) {
        console.log('   Creating a test user in the emulator...');
        user = await auth.createUser({
          email: ADMIN_EMAIL || 'admin@therealhelp.com',
          password: 'TestPass123!',
          displayName: 'Admin User',
        });
        console.log(`✅ Created emulator user: ${user.email} (${user.uid})`);
      } else {
        process.exit(1);
      }
    }
  } else {
    // No email provided — create a test user in the emulator
    if (!USE_EMULATORS) {
      console.log('❌ Set ADMIN_EMAIL env var when running against production.');
      process.exit(1);
    }

    console.log('   No ADMIN_EMAIL set. Creating test user in emulator...');
    user = await auth.createUser({
      email: 'admin@therealhelp.com',
      password: 'TestPass123!',
      displayName: 'Admin User',
    });
    console.log(`✅ Created emulator user: ${user.email} (${user.uid})`);
  }

  // Step 2: Set custom claims (role + tenantId)
  await auth.setCustomUserClaims(user.uid, {
    role: 'admin',
    tenantId: TENANT_ID,
  });
  console.log(`✅ Set custom claims: role=admin, tenantId=${TENANT_ID}`);

  // Step 3: Create the tenant document
  const tenantRef = db.collection('tenants').doc(TENANT_ID);
  await tenantRef.set({
    name: TENANT_NAME,
    slug: 'the-real-help',
    createdAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log(`✅ Tenant doc created: tenants/${TENANT_ID}`);

  // Step 4: Create the user document inside the tenant
  const userRef = tenantRef.collection('users').doc(user.uid);
  await userRef.set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Admin',
    role: 'admin',
    tenantId: TENANT_ID,
    createdAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  console.log(`✅ User doc created: tenants/${TENANT_ID}/users/${user.uid}`);

  // Done
  console.log('\n── Bootstrap Complete ──\n');
  console.log('Next steps:');
  if (USE_EMULATORS) {
    console.log('  1. Open http://localhost:5173/login');
    console.log(`  2. Sign in with: ${user.email} / TestPass123!`);
    console.log('  3. You\'ll have full admin access');
    console.log(`  4. Emulator UI: http://localhost:4000`);
  } else {
    console.log('  1. Open your deployed app or localhost');
    console.log(`  2. Sign in with: ${user.email}`);
    console.log('  3. The user now has admin claims — may need to sign out/in to refresh token');
  }
  console.log('');
}

main().catch((err) => {
  console.error('❌ Bootstrap failed:', err.message);
  process.exit(1);
});
