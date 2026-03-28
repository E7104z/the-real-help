export const ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  USER: 'user',
  CLIENT: 'client',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  staff: 2,
  user: 1,
  client: 0,
};

export function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}
