import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { desativarCargo } from '../api'

export const useDesativarCargoMutation = (departamentoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cargoId: string) => desativarCargo(departamentoId, cargoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Cargo desativado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao desativar o cargo. Tente novamente mais tarde.',
      )
    },
  })
}
