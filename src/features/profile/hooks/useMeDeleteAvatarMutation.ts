import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { deleteAvatar } from '../api'

export const useMeDeleteAvatarMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao excluir a foto de perfil. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
