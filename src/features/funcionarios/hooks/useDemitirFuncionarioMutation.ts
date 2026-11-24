import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { demitirFuncionario } from '../api'

export const useDemitirFuncionarioMutation = (funcionarioId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (funcionarioId: string) => demitirFuncionario(funcionarioId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
      queryClient.invalidateQueries({ queryKey: ['funcionario', funcionarioId] })
      toast.success('Funcionário demitido com sucesso.')
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          'Ocorreu um erro ao demitir o funcionário. Tente novamente mais tarde.',
        ),
      )
    },
  })
}
