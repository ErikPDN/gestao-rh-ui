export interface ProfileResponse {
  id: string
  email: string
  roles: string[]
  funcionarioId: string
  nome: string
  avatarUrl?: string
  cargo?: string
  departamento?: string
}
