import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import { logout } from '../api'

export const useLogoutMutation = () => {
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession()
    },
  })
}
