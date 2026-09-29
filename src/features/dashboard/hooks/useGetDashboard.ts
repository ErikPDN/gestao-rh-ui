import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../api'

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    retry: false,
  })
}
