import { useQuery } from '@tanstack/react-query'
import { getCargoByDepartamentoAndCargo } from '../api'

export const useGetCargoQuery = (
  departamentoId: string | undefined,
  cargoId: string | undefined,
) => {
  return useQuery({
    queryKey: ['cargo', departamentoId, cargoId],
    queryFn: () => getCargoByDepartamentoAndCargo(departamentoId!, cargoId!),
    enabled: !!departamentoId && !!cargoId,
    staleTime: 1000 * 60 * 5,
  })
}
