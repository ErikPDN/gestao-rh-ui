import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { updateAvatar } from '../api'

export const useMeUpdateAvatarMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
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
