import { useQuery } from '@tanstack/react-query'
import { getCargosByDepartamento } from '../api'

export const useGetCargosQuery = (departamentoId: string | undefined) => {
  return useQuery({
    queryKey: ['cargos', departamentoId],
    queryFn: () => getCargosByDepartamento(departamentoId!),
    enabled: !!departamentoId,
    staleTime: 1000 * 60 * 5,
  })
}
