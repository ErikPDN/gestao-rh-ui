import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import { login } from '../api'

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: login,
    onSuccess: ({ usuario, accessToken }) => setSession(usuario, accessToken),
  })
}
