import z from 'zod'
import { cadastrarDepartamentoSchema } from './cadastrar-departamento'

export const updateDepartamentoSchema = cadastrarDepartamentoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo para atualizar o departamento',
  })

export type UpdateDepartamentoFormSchema = z.infer<typeof updateDepartamentoSchema>
