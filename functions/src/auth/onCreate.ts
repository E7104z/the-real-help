import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { auth } from "../config";
import { FieldValue } from "firebase-admin/firestore";
import { tenantCollection } from "../utils/firestoreHelpers";

/**
 * When a new Firebase Auth user is created, bootstrap their tenant user doc
 * and set initial custom claims.
 */
export const onUserCreated = onDocumentCreated(
  "tenants/{tenantId}/users/{userId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const { tenantId, userId } = event.params;

    // Set custom claims for role-based access
    await auth.setCustomUserClaims(userId, {
      role: data["role"] ?? "user",
      tenantId,
    });

    // Update the user doc with a server timestamp
    await tenantCollection(tenantId, "users").doc(userId).update({
      claimsSetAt: FieldValue.serverTimestamp(),
    });
  }
);
