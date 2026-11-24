import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/utils/get-error-message'
import { cadastrarCargo } from '../api'
import type { CadastrarCargoFormSchema } from '../schemas/cadastrar-cargo'

export const useCadastrarCargoMutation = (departamentoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CadastrarCargoFormSchema) => cadastrarCargo(departamentoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Cargo cadastrado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, 'Ocorreu um erro ao cadastrar o cargo. Tente novamente mais tarde.'),
      )
    },
  })
}
