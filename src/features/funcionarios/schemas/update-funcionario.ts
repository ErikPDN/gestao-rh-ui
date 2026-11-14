import type z from 'zod'
import { cadastrarFuncionarioSchema } from './cadastrar'

export const updateFuncionario = cadastrarFuncionarioSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo para atualizar o funcionário',
  })

export type UpdateFuncionarioSchema = z.infer<typeof updateFuncionario>
