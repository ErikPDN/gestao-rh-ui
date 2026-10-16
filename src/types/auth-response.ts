import type { Usuario } from './usuario.interface'

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  usuario: Usuario | null
}
