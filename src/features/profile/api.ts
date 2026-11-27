import { httpClient } from '../../lib/api-client'
import type { UpdateSenhaPayload } from './schemas/update-senha'
import type { ProfileResponse } from './types/profile-response'
import type { UpdateAvatarRequest } from './types/update-avatar-request'

export const getMe = async () => {
  const response = await httpClient.get<ProfileResponse>('/auth/me')
  return response.data
}

export const updateSenha = async (data: UpdateSenhaPayload) => {
  const response = await httpClient.patch(`/auth/senha`, data)
  return response.data
}

export const updateAvatar = async ({ file }: UpdateAvatarRequest) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await httpClient.post(`/auth/me/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}

export const deleteAvatar = async () => {
  const response = await httpClient.delete(`/auth/me/avatar`)
  return response.data
}
