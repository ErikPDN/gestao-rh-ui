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
        <div
          role="status"
          aria-label="Carregando"
          className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 motion-reduce:animate-[spin_2s_linear_infinite]"
        />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRoles && !hasAnyRole(allowedRoles)) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
