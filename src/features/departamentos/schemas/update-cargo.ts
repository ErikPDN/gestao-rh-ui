import type z from 'zod'
import { cargoBaseSchema, tetoMaiorOuIgualBase } from './cadastrar-cargo'

export const updateCargoSchema = cargoBaseSchema
  .partial()
  .refine(tetoMaiorOuIgualBase.check, tetoMaiorOuIgualBase.params)

export type UpdateCargoFormSchema = z.infer<typeof updateCargoSchema>
