import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../api'

export const useGetDashboardQuery = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    retry: false,
  })
}
