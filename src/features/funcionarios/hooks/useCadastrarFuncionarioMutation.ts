import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cadastrarFuncionario } from '../api'

export const useCadastrarFuncionarioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cadastrarFuncionario,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['funcionarios'] }),
  })
}
