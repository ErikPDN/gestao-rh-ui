import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import { login } from '../api'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: login,
    onSuccess: ({ usuario, accessToken }) => {
      setSession(usuario, accessToken)
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
