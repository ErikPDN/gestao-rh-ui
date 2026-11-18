import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { updateFuncionario, type UpdateFuncionarioSchema } from '../schemas/update-funcionario'
import { Dot } from 'lucide-react'
import { formatCurrency } from '../../../lib/utils/currency-formatter'
import { formatCPF } from '../../../lib/utils/cpf-formatter'
import { SelectField } from './SelectField'
import { useGetCargosQuery } from '../hooks/useGetCargosQuery'
import { useGetDepartamentosQuery } from '../hooks/useGetDepartamentosQuery'
import { useUpdateFuncionarioMutation } from '../hooks/useUpdateFuncionarioMutation'

interface EditFuncionarioFormProps {
  onClose: () => void
  funcionarioCpf: string
  funcionarioNome: string
  funcionarioDepartamentoId: string
  funcionarioCargoId: string
  funcionarioSalario: number
  funcionarioDataNascimento?: Date
  funcionarioDataAdmissao?: Date
}

export const EditFuncionarioForm = ({
  onClose,
  funcionarioCpf,
  funcionarioNome,
  funcionarioDepartamentoId,
  funcionarioCargoId,
  funcionarioSalario,
  funcionarioDataNascimento,
  funcionarioDataAdmissao,
}: EditFuncionarioFormProps) => {
  const { id: funcionarioId } = useParams()

  const toInputDate = (value?: Date | string) =>
    value ? new Date(value).toISOString().slice(0, 10) : ''

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof updateFuncionario>, unknown, UpdateFuncionarioSchema>({
    resolver: zodResolver(updateFuncionario),
    defaultValues: {
      nome: funcionarioNome,
      departamentoId: funcionarioDepartamentoId,
      cargoId: funcionarioCargoId,
      salario: String(funcionarioSalario),
      dataNascimento: toInputDate(funcionarioDataNascimento) as unknown as Date,
    },
  })

  const departamentoId = useWatch({ control, name: 'departamentoId' })

  const { data: departamentos, isLoading: isLoadingDepartamentos } = useGetDepartamentosQuery()
  const { data: cargos, isLoading: isLoadingCargos } = useGetCargosQuery(departamentoId)

  const {
    mutate: updateFuncionarioMutation,
    isPending,
    error,
  } = useUpdateFuncionarioMutation(funcionarioId as string)

  const cargoPlaceholder = !departamentoId
    ? 'Escolha o departamento primeiro'
    : isLoadingCargos
      ? 'Carregando cargos...'
      : 'Selecione um cargo'

  const cargoId = useWatch({ control, name: 'cargoId' })
  const cargoSelecionado = cargos?.find((cargo) => cargo.id === cargoId)

  const toDate = (value: string) => (value ? new Date(value) : undefined)

  const onSubmit = (data: UpdateFuncionarioSchema) => {
    updateFuncionarioMutation(data, { onSuccess: onClose })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (error) => console.error(error))}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="scrollbar-hidden flex-1 space-y-6 overflow-y-auto p-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            <label htmlFor="cpf" className="text-sm font-medium text-zinc-700">
              CPF
            </label>
            <Dot size={12} />
            <span className="text-sm text-zinc-400">não editável</span>
          </div>

          <input
            type="text"
            id="cpf"
            maxLength={14}
            aria-label="CPF do funcionário"
            placeholder="Ex.: 123.456.789-00"
            className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 font-mono text-sm outline-none"
            readOnly
            value={formatCPF(funcionarioCpf)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-zinc-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            aria-label="Nome do funcionário"
            placeholder="Ex.: João da Silva"
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
            {...register('nome')}
          />
        </div>

        <Controller
          control={control}
          name="departamentoId"
          render={({ field }) => (
            <SelectField
              id="departamento"
              label="Departamento"
              options={departamentos?.data ?? []}
              value={field.value ?? ''}
              onChange={(id) => {
                if (id === field.value) return
                field.onChange(id)
                setValue('cargoId', '')
              }}
              placeholder={
                isLoadingDepartamentos ? 'Carregando departamentos...' : 'Selecione um departamento'
              }
              disabled={isLoadingDepartamentos}
              error={errors.departamentoId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="cargoId"
          render={({ field }) => (
            <SelectField
              id="cargo"
              label="Cargo"
              options={cargos ?? []}
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder={cargoPlaceholder}
              disabled={!departamentoId || isLoadingCargos}
              error={errors.cargoId?.message}
            />
          )}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="salario" className="text-sm font-medium text-zinc-700">
            Salário
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-zinc-400">
              R$
            </span>
            <input
              type="text"
              inputMode="decimal"
              id="salario"
              placeholder="0.00"
              {...register('salario')}
              className="bg-background w-full rounded-md border border-zinc-300 py-2 pr-3 pl-10 text-right font-mono text-sm outline-none"
            />
          </div>
          {cargoSelecionado && (
            <div className="mt-1 flex font-mono text-xs text-zinc-400">
              <span>{formatCurrency(cargoSelecionado.salarioBase)}</span>
              <span>&nbsp;-&nbsp;{formatCurrency(cargoSelecionado.salarioTeto)}</span>
            </div>
          )}
          {errors.salario && <p className="mt-1 text-xs text-red-600">{errors.salario.message}</p>}
        </div>

        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="data-nascimento" className="text-sm font-medium text-zinc-700">
              Data de nascimento
            </label>
            <input
              type="date"
              id="data-nascimento"
              aria-label="Data de nascimento do funcionário"
              {...register('dataNascimento', { setValueAs: toDate })}
              className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
            />
            {errors.dataNascimento && (
              <p className="mt-1 text-xs text-red-600">{errors.dataNascimento.message}</p>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-0.5">
              <label htmlFor="data-admissao" className="text-sm font-medium text-zinc-700">
                Admissão
              </label>
              <Dot size={12} />
              <span className="text-sm text-zinc-400">não editável</span>
            </div>
            <input
              type="date"
              id="data-admissao"
              aria-label="Data de admissão do funcionário"
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm outline-none"
              readOnly
              value={toInputDate(funcionarioDataAdmissao)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            Não foi possível atualizar o funcionário. Tente novamente.
          </p>
        )}
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
          {isPending ? 'Atualizando...' : 'Atualizar'}
        </button>
      </footer>
    </form>
  )
}
