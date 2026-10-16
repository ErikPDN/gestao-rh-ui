import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cadastrarFuncionario } from '../api'
import { toast } from 'sonner'

export const useCadastrarFuncionarioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cadastrarFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
      toast.success('Funcionário cadastrado com sucesso.')
    },
  })
}
