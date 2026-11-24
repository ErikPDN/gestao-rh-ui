import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { ativarDepartamento } from '../api'

export const useAtivarDepartamentoMutation = (departamentoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (departamentoId: string) => ativarDepartamento(departamentoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Departamento ativado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao ativar o departamento. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
