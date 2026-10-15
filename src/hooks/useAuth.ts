import { useAuthStore } from '../lib/store/auth-store'
import type { Role } from '../types/usuario.interface'

export const useAuth = () => {
  const usuario = useAuthStore((state) => state.usuario)
  const isHydrating = useAuthStore((state) => state.isHydrating)

  const hasAnyRole = (roles: Role[]) =>
    !!usuario && roles.some((role) => usuario.roles.includes(role))

  return {
    usuario,
    isHydrating,
    isAuthenticated: !!usuario,
    hasAnyRole,
  }
}
