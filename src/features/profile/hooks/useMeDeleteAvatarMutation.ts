import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useMeDeleteAvatarMutation = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao atualizar a foto de perfil. Tente novamente mais tarde.',
      )
    },
  })
}
