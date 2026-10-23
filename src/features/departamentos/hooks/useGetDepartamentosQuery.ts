import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getDepartamentos } from '../api'
import type { GetDepartamentosParams } from '../types/get-departamentos-params'

export const useGetDepartamentosQuery = (params: GetDepartamentosParams) => {
  return useQuery({
    queryKey: ['departamentos', params],
    queryFn: () => getDepartamentos(params),
    placeholderData: keepPreviousData,
    retry: false,
  })
}
