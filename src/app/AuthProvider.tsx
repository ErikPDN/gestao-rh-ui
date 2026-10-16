import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '../lib/store/auth-store'
import { refreshSession } from '../lib/api-client'

export default function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { setSession, clearSession, setIsHydrating } = useAuthStore.getState()

    refreshSession()
      .then(({ usuario, accessToken }) => setSession(usuario, accessToken))
      .catch(() => clearSession())
      .finally(() => setIsHydrating(false))
  }, [])

  return <>{children}</>
}
