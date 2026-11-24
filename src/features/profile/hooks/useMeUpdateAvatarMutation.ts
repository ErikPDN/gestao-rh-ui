import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'

export const useMeUpdateAvatarMutation = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao atualizar a foto de perfil. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
