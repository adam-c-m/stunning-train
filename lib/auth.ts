export type UserRole = "admin" | "premium" | "basic" | "guest"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  level: number
  totalPoints: number
  joinDate: string
  lastActive: string
  status: "active" | "inactive"
}

export const ROLE_PERMISSIONS = {
  admin: {
    canManageStore: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canAccessTraining: true,
    canModerateContent: true,
  },
  premium: {
    canManageStore: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canAccessTraining: true,
    canModerateContent: false,
  },
  basic: {
    canManageStore: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canAccessTraining: true,
    canModerateContent: false,
  },
  guest: {
    canManageStore: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canAccessTraining: false,
    canModerateContent: false,
  },
}

export function hasPermission(userRole: UserRole, permission: keyof typeof ROLE_PERMISSIONS.admin): boolean {
  return ROLE_PERMISSIONS[userRole][permission] || false
}

export function canAccessAdminPanel(userRole: UserRole): boolean {
  return userRole === "admin"
}

export function canAccessPremiumContent(userRole: UserRole): boolean {
  return userRole === "admin" || userRole === "premium"
}

// Mock current user - in a real app, this would come from authentication
export const getCurrentUser = (): User => ({
  id: "1",
  name: "Alex Johnson",
  email: "alex@businesspro.com",
  role: "admin", // Change this to test different roles: "admin", "premium", "basic", "guest"
  level: 5,
  totalPoints: 1250,
  joinDate: "2024-01-15",
  lastActive: "2024-01-30",
  status: "active",
})
