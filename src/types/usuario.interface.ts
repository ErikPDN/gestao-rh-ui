export const Role = {
  ADMIN: 'ADMIN',
  RH: 'RH',
  GESTOR: 'GESTOR',
  COLABORADOR: 'COLABORADOR',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export interface Usuario {
  id: string
  email: string
  nome: string
  roles: Role[]
  funcionarioId: string
}
