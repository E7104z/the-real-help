import { db } from "../config";

export function tenantDoc(tenantId: string) {
  return db.collection("tenants").doc(tenantId);
}

export function tenantCollection(tenantId: string, collection: string) {
  return tenantDoc(tenantId).collection(collection);
}
