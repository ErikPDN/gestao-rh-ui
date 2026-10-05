import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import type z from 'zod'
import { useCadastrarFuncionario } from '../hooks/useCadastrarFuncionario'
import { useGetCargosQuery } from '../hooks/useGetCargosQuery'
import { useGetDepartamentosQuery } from '../hooks/useGetDepartamentosQuery'
import { cadastrarFuncionarioSchema, type CadastrarFuncionarioSchema } from '../schemas/cadastrar'
import { SelectField } from './SelectField'
import { formatCurrency } from '../../../lib/utils/currency-formatter'

interface CadastrarFuncionarioFormProps {
  onClose: () => void
}

const toDate = (value: string) => (value ? new Date(value) : undefined)

export const CadastrarFuncionarioForm = ({ onClose }: CadastrarFuncionarioFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof cadastrarFuncionarioSchema>, unknown, CadastrarFuncionarioSchema>({
    resolver: zodResolver(cadastrarFuncionarioSchema),
    defaultValues: { departamento: '', cargo: '' },
  })

  const departamentoId = useWatch({ control, name: 'departamento' })

  const { data: departamentos, isLoading: isLoadingDepartamentos } = useGetDepartamentosQuery()
  const { data: cargos, isLoading: isLoadingCargos } = useGetCargosQuery(departamentoId)

  const { mutate: cadastrarFuncionario, isPending, error } = useCadastrarFuncionario()

  const cargoId = useWatch({ control, name: 'cargo' })
  const cargoSelecionado = cargos?.find((cargo) => cargo.id === cargoId)

  const onSubmit = (data: CadastrarFuncionarioSchema) => {
    cadastrarFuncionario(data, { onSuccess: onClose })
  }

  const cargoPlaceholder = !departamentoId
    ? 'Escolha o departamento primeiro'
    : isLoadingCargos
      ? 'Carregando cargos...'
      : 'Selecione um cargo'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
      <div className="scrollbar-hidden flex-1 space-y-6 overflow-y-auto p-6">
        <div className="flex flex-col">
          <label htmlFor="cpf" className="text-sm font-medium text-zinc-700">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            aria-label="CPF do funcionário"
            placeholder="000.000.000-00"
            {...register('cpf')}
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
          />
          {errors.cpf && <p className="mt-1 text-xs text-red-600">{errors.cpf.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="nome" className="text-sm font-medium text-zinc-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            aria-label="Nome do funcionário"
            placeholder="Nome completo"
            {...register('nome')}
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
          />
          {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome.message}</p>}
        </div>

        <Controller
          control={control}
          name="departamento"
          render={({ field }) => (
            <SelectField
              id="departamento"
              label="Departamento"
              options={departamentos?.data ?? []}
              value={field.value}
              onChange={(id) => {
                if (id === field.value) return
                field.onChange(id)
                setValue('cargo', '')
              }}
              placeholder={
                isLoadingDepartamentos ? 'Carregando departamentos...' : 'Selecione um departamento'
              }
              disabled={isLoadingDepartamentos}
              error={errors.departamento?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="cargo"
          render={({ field }) => (
            <SelectField
              id="cargo"
              label="Cargo"
              options={cargos ?? []}
              value={field.value}
              onChange={field.onChange}
              placeholder={cargoPlaceholder}
              disabled={!departamentoId || isLoadingCargos}
              error={errors.cargo?.message}
            />
          )}
        />

        <div className="flex flex-col">
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
          <div className="flex flex-1 flex-col">
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

          <div className="flex flex-1 flex-col">
            <label htmlFor="data-admissao" className="text-sm font-medium text-zinc-700">
              Admissão
            </label>
            <input
              type="date"
              id="data-admissao"
              aria-label="Admissão do funcionário"
              {...register('dataAdmissao', { setValueAs: toDate })}
              className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
            />
            {errors.dataAdmissao && (
              <p className="mt-1 text-xs text-red-600">{errors.dataAdmissao.message}</p>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">
            Não foi possível cadastrar o funcionário. Tente novamente.
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
          {isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </footer>
    </form>
  )
}
