import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateDepartamento } from '../api'
import type { UpdateDepartamentoSchema } from '../schemas/update-departamento'

export const useUpdateDepartamentoMutation = (departamentoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateDepartamentoSchema) => updateDepartamento(departamentoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      queryClient.invalidateQueries({ queryKey: ['departamento', departamentoId] })
      toast.success('Departamento atualizado com sucesso.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao atualizar o departamento. Tente novamente mais tarde.',
      )
    },
  })
}
