import { useQuery } from '@tanstack/react-query'
import { getDepartamentos } from '../api'

export const useGetDepartamentosQuery = () => {
  return useQuery({
    queryKey: ['departamentos'],
    queryFn: getDepartamentos,
    staleTime: 1000 * 60 * 5,
  })
}
