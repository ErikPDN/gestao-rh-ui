import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cadastrarDepartamento } from '../api'
import { toast } from 'sonner'

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
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao cadastrar o departamento. Tente novamente mais tarde.',
      )
    },
  })
}
