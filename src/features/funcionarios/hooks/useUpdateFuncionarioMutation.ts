import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateFuncionarioSchema } from '../schemas/update-funcionario'
import { updateFuncionario } from '../api'
import { toast } from 'sonner'

export const useUpdateFuncionarioMutation = (funcionarioId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateFuncionarioSchema) => updateFuncionario(funcionarioId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] })
      queryClient.invalidateQueries({ queryKey: ['funcionario', funcionarioId] })
      toast.success('Funcionário atualizado com sucesso.')
    },
  })
}
