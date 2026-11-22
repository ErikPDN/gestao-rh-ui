import { httpClient } from '../../lib/api-client'
import type { ProfileResponse } from './types/profile-response'

export const getMe = async () => {
  const response = await httpClient.get<ProfileResponse>('/auth/me')
  return response.data
}
