import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getDepartamentos } from '../api'

export const useGetDepartamentosQuery = (params: any) => {
  return useQuery({
    queryKey: ['departamentos', params],
    queryFn: () => getDepartamentos(params),
    placeholderData: keepPreviousData,
    retry: false,
  })
}
