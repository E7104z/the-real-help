export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export interface TenantUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  tenantId: string;
  createdAt: Date;
}
