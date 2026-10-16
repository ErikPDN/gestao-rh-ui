import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import { logout } from '../api'
import { toast } from 'sonner'

export const useLogoutMutation = () => {
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession()
      toast.success('Logout realizado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao tentar fazer logout. Tente novamente mais tarde.',
      )
    },
  })
}
