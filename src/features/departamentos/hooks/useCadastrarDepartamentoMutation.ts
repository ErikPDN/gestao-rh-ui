import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cadastrarDepartamento } from '../api'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'

export const useCadastrarDepartamentoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cadastrarDepartamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      toast.success('Departamento cadastrado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao cadastrar o departamento. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
