import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cadastrarDepartamento } from '../api'

export const useCadastrarDepartamentoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cadastrarDepartamento,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departamentos'] }),
  })
}
