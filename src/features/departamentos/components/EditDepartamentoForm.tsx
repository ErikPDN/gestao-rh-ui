import { useForm } from 'react-hook-form'
import {
  updateDepartamentoSchema,
  type UpdateDepartamentoSchema,
} from '../schemas/update-departamento'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useUpdateDepartamentoMutation } from '../hooks/useUpdateDepartamentoMutation'

interface EditDepartamentoFormProps {
  onClose: () => void
  departamentoNome: string
  departamentoDescricao: string
}

export const EditDepartamentoForm = ({
  onClose,
  departamentoNome,
  departamentoDescricao,
}: EditDepartamentoFormProps) => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDepartamentoSchema>({
    resolver: zodResolver(updateDepartamentoSchema),
    defaultValues: {
      nome: departamentoNome,
      descricao: departamentoDescricao,
    },
  })

  const { mutate: updateDepartamento, isPending } = useUpdateDepartamentoMutation(id as string)

  const onSubmit = (data: UpdateDepartamentoSchema) => {
    updateDepartamento(data, { onSuccess: onClose })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
      <div className="scrollbar-hidden flex-1 space-y-6 overflow-y-auto p-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-zinc-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            maxLength={100}
            aria-label="Nome do departamento"
            placeholder="Ex.: Operações"
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
            {...register('nome')}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <label htmlFor="descricao" className="text-sm font-medium text-zinc-700">
              Descrição
            </label>
            <span className="text-xs text-zinc-400">(opcional)</span>
          </div>

          <textarea
            id="descricao"
            maxLength={255}
            aria-label="Descrição do departamento"
            placeholder="O que está área faz"
            className="bg-background min-h-28 w-full resize-y rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
            {...register('descricao')}
          />
        </div>
      </div>

      <footer className="flex justify-end gap-3 border-t border-zinc-300 bg-zinc-100 px-6 py-4">
        <button
          type="button"
          className="bg-background cursor-pointer rounded-md border border-zinc-200 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-500/10"
          onClick={onClose}
          disabled={isPending}
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Salvar
        </button>
      </footer>
    </form>
  )
}
