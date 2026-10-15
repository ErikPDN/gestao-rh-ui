import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types/usuario.interface'

interface ProtectedRouteProps {
  allowedRoles?: Role[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isHydrating, isAuthenticated, hasAnyRole } = useAuth()
  const location = useLocation()

  if (isHydrating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-500 border-t-zinc-500" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRoles && !hasAnyRole(allowedRoles)) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
