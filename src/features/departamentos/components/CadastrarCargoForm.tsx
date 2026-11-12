import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NivelCargoSelector } from './NivelCargoSelector'
import { useCadastrarCargoMutation } from '../hooks/useCadastrarCargoMutation'
import { cadastrarCargoSchema, type CadastrarCargoFormSchema } from '../schemas/cadastrar-cargo'

interface CadastrarCargoModalFormProps {
  departamentoId: string
  onClose: () => void
}

export const CadastrarCargoModalForm = ({
  departamentoId,
  onClose,
}: CadastrarCargoModalFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarCargoFormSchema>({
    resolver: zodResolver(cadastrarCargoSchema),
  })

  const { mutate: cadastrarCargo, isPending } = useCadastrarCargoMutation(departamentoId)

  const onSubmit = (data: CadastrarCargoFormSchema) => {
    cadastrarCargo(data, { onSuccess: onClose })
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
            aria-label="Nome do cargo"
            placeholder="Ex.: Analista de Dados"
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
            {...register('nome')}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome.message}</p>}
        </div>

        <div className="flex items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <label htmlFor="salario-base" className="text-sm font-medium text-zinc-700">
              Salário Base
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-zinc-400">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                id="salario-base"
                inputMode="decimal"
                placeholder="0.00"
                className="bg-background w-full [appearance:textfield] rounded-md border border-zinc-300 px-3 py-2 text-right font-mono text-sm outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                {...register('salarioBase', { valueAsNumber: true })}
              />
            </div>
            {errors.salarioBase && (
              <p className="mt-1 text-xs text-red-600">{errors.salarioBase.message}</p>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <label htmlFor="salario-teto" className="text-sm font-medium text-zinc-700">
              Salário Teto
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-zinc-400">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                id="salario-teto"
                inputMode="decimal"
                placeholder="0.00"
                className="bg-background w-full [appearance:textfield] rounded-md border border-zinc-300 px-3 py-2 text-right font-mono text-sm outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                {...register('salarioTeto', { valueAsNumber: true })}
              />
            </div>
            {errors.salarioTeto && (
              <p className="mt-1 text-xs text-red-600">{errors.salarioTeto.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <span id="nivel-label" className="text-sm font-medium text-zinc-700">
              Nível
            </span>
            <span className="text-xs text-zinc-400">(opcional)</span>
          </div>

          <Controller
            name="nivel"
            control={control}
            render={({ field }) => (
              <NivelCargoSelector value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.nivel && <p className="mt-1 text-xs text-red-600">{errors.nivel.message}</p>}
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
          {isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </footer>
    </form>
  )
}
