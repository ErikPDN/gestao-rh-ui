import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateCargoFormSchema } from '../schemas/update-cargo'
import { toast } from 'sonner'
import { updateCargo } from '../api'

export const useUpdateCargoMutation = (departamentoId: string, cargoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCargoFormSchema) => updateCargo(departamentoId, cargoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Cargo atualizado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao atualizar o cargo. Tente novamente mais tarde.',
      )
    },
  })
}
