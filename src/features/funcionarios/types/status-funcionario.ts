export const StatusFuncionario = {
  ATIVO: 'Ativo',
  DESLIGADO: 'Desligado',
} as const

export type StatusFuncionario = (typeof StatusFuncionario)[keyof typeof StatusFuncionario]
