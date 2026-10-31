export const NivelCargo = {
  TRAINEE: 'TRAINEE',
  JUNIOR: 'JUNIOR',
  PLENO: 'PLENO',
  SENIOR: 'SENIOR',
  ESPECIALISTA: 'ESPECIALISTA',
} as const

export type NivelCargo = (typeof NivelCargo)[keyof typeof NivelCargo]
