import z from 'zod'
import { NivelCargo } from '../../funcionarios/types/nivel-cargo'

export const cadastrarCargoSchema = z
  .object({
    nome: z
      .string()
      .min(1, { message: 'O nome do cargo é obrigatório' })
      .max(255, { message: 'O nome do cargo deve ter no máximo 255 caracteres' }),
    salarioBase: z
      .number({ message: 'Informe o salário' })
      .positive({ message: 'O salário deve ser maior que zero' })
      .max(1_000_000, { message: 'Valor acima do permitido' }),
    salarioTeto: z
      .number({ message: 'Informe o salário' })
      .positive({ message: 'O salário deve ser maior que zero' })
      .max(1_000_000, { message: 'Valor acima do permitido' }),
    nivel: z.enum(NivelCargo, { message: 'Nível inválido' }).optional(),
  })
  .refine((data) => data.salarioTeto >= data.salarioBase, {
    message: 'O salário teto deve ser maior ou igual ao salário base',
    path: ['salarioTeto'],
  })

export type CadastrarCargoFormSchema = z.infer<typeof cadastrarCargoSchema>
