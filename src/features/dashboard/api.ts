import { httpClient } from '../../lib/api-client'
import type { DashboardResponse } from './types/dashboard-response.interface'

export const getDashboardData = async () => {
  const response = await httpClient.get<DashboardResponse>('/dashboard')

  return response.data
}
