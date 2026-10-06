export const StatusDepartamento = {
  ATIVO: 'Ativo',
  INATIVO: 'Inativo',
} as const

export type StatusDepartamento = (typeof StatusDepartamento)[keyof typeof StatusDepartamento]
