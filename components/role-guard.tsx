"use client"

import type { ReactNode } from "react"
import { getCurrentUser, hasPermission, type UserRole } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Crown, Star } from "lucide-react"

interface RoleGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  requiredPermission?: string
  fallback?: ReactNode
}

export function RoleGuard({ children, requiredRole, requiredPermission, fallback }: RoleGuardProps) {
  const currentUser = getCurrentUser()

  // Check role-based access
  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      guest: 0,
      basic: 1,
      premium: 2,
      admin: 3,
    }

    if (roleHierarchy[currentUser.role] < roleHierarchy[requiredRole]) {
      return (
        fallback || (
          <Card className="max-w-md mx-auto mt-8">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                {requiredRole === "premium" ? (
                  <Crown className="h-16 w-16 text-yellow-500 mx-auto" />
                ) : requiredRole === "admin" ? (
                  <Lock className="h-16 w-16 text-red-500 mx-auto" />
                ) : (
                  <Star className="h-16 w-16 text-blue-500 mx-auto" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
              <p className="text-gray-600 mb-4">
                This content requires {requiredRole} access or higher.
                {requiredRole === "premium" && " Upgrade your membership to unlock premium features."}
                {requiredRole === "admin" && " Administrator privileges required."}
              </p>
              {requiredRole === "premium" && (
                <div className="text-sm text-gray-500">
                  Current role: <span className="capitalize font-medium">{currentUser.role}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      )
    }
  }

  // Check permission-based access
  if (requiredPermission) {
    if (!hasPermission(currentUser.role, requiredPermission as any)) {
      return (
        fallback || (
          <Card className="max-w-md mx-auto mt-8">
            <CardContent className="p-8 text-center">
              <Lock className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Permission Denied</h3>
              <p className="text-gray-600">You don't have permission to access this feature.</p>
            </CardContent>
          </Card>
        )
      )
    }
  }

  return <>{children}</>
}
