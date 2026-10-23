import { useQuery } from '@tanstack/react-query'
import { getDepartamento } from '../api'

export const useGetDepartamentoQuery = (departamentoId: string) => {
  return useQuery({
    queryKey: ['departamento', departamentoId],
    queryFn: () => getDepartamento(departamentoId),
    retry: false,
  })
}
