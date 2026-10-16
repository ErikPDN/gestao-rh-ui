import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Usuario } from '../../types/usuario.interface'
import { queryClient } from '../query-client'

interface AuthStore {
  usuario: Usuario | null
  accessToken: string | null
  isHydrating: boolean
  setSession: (usuario: Usuario | null, accessToken: string) => void
  setAccessToken: (accessToken: string) => void
  setIsHydrating: (isHydrating: boolean) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      usuario: null,
      accessToken: null,
      isHydrating: true,
      setIsHydrating: (isHydrating) => {
        set({ isHydrating })
      },
      setSession: (usuario, accessToken) => {
        set({ usuario, accessToken })
      },
      setAccessToken: (accessToken) => {
        set({ accessToken })
      },
      clearSession: () => {
        set({ usuario: null, accessToken: null })
        queryClient.clear()
      },
    }),
    { name: 'auth-storage', partialize: (state) => ({ usuario: state.usuario }) },
  ),
)
