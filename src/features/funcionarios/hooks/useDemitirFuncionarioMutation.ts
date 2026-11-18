import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao demitir o funcionário. Tente novamente mais tarde.',
      )
    },
  })
}
