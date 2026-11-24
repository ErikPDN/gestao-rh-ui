import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../../lib/store/auth-store'
import type { UpdateSenhaPayload } from '../schemas/update-senha'
import { toast } from 'sonner'
import { updateSenha } from '../api'
import { getErrorMessage } from '../../../lib/utils/get-error-message'

export const useUpdateSenhaMutation = () => {
  const queryClient = useQueryClient()
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    mutationFn: (data: UpdateSenhaPayload) => updateSenha(data),
    onSuccess: () => {
      toast.success('Senha atualizada com sucesso. Faça login novamente.')
      clearSession()
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao tentar atualizar a senha. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
