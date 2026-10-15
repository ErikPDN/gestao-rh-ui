import { httpClient } from '../../lib/api-client'
import type { AuthResponse } from '../../types/auth-response'
import type { LoginFormSchema } from './schemas/login'

export const login = async (data: LoginFormSchema) => {
  const response = await httpClient.post<AuthResponse>('/auth/login', data)
  return response.data
}
