import { httpClient } from '../../lib/api-client'
import type { UpdateSenhaPayload } from './schemas/update-senha'
import type { ProfileResponse } from './types/profile-response'

export const getMe = async () => {
  const response = await httpClient.get<ProfileResponse>('/auth/me')
  return response.data
}

export const updateSenha = async (data: UpdateSenhaPayload) => {
  const response = await httpClient.patch(`/auth/senha`, data)
  return response.data
}
