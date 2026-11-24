import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { desativarDepartamento } from '../api'

export const useDesativarDepartamentoMutation = (departamentoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (departamentoId: string) => desativarDepartamento(departamentoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Departamento desativado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao desativar o departamento. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
