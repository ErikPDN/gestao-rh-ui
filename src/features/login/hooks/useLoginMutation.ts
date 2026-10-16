import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import { login } from '../api'
import { toast } from 'sonner'

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: login,
    onSuccess: ({ usuario, accessToken }) => {
      setSession(usuario, accessToken)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
      )
    },
  })
}
