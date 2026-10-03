import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// TODO: substituir pelos dados da API
const DepartamentoOptions = [
  'Tecnologia da Informação',
  'Recursos Humanos',
  'Financeiro',
  'Marketing',
  'Vendas',
  'Produção',
]

// TODO: carregar os cargos conforme o departamento selecionado
const CargoOptions = [
  'Desenvolvedor',
  'Analista de RH',
  'Gerente Financeiro',
  'Especialista em Marketing',
  'Representante de Vendas',
  'Supervisor de Produção',
]

export const CadastrarFuncionarioForm = () => {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string | null>(null)
  const [isSelectDepartamentoOpen, setIsSelectDepartamentoOpen] = useState(false)

  const [selectedCargo, setSelectedCargo] = useState<string | null>(null)
  const [isSelectCargoOpen, setIsSelectCargoOpen] = useState(false)

  const isCargoHabilitado = selectedDepartamento !== null

  const handleDepartamentoChange = (departamento: string) => {
    if (departamento !== selectedDepartamento) setSelectedCargo(null)
    setSelectedDepartamento(departamento)
    setIsSelectDepartamentoOpen(false)
  }

  const handleCargoChange = (cargo: string) => {
    setSelectedCargo(cargo)
    setIsSelectCargoOpen(false)
  }

  return (
    <form id="form-funcionario" className="scrollbar-hidden flex-1 space-y-6 overflow-y-auto p-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="cpf" className="text-sm font-medium text-zinc-700">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          aria-label="CPF do funcionário"
          placeholder="000.000.000-00"
          value={''}
          className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none"
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
          placeholder="Nome completo"
          value={''}
          className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
        />
      </div>
      <div className="relative w-full gap-1">
        <label htmlFor="departamento" className="text-sm font-medium text-zinc-700">
          Departamento
        </label>
        <button
          type="button"
          id="departamento"
          onClick={() => setIsSelectDepartamentoOpen(!isSelectDepartamentoOpen)}
          className="bg-background flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-3 text-zinc-700 transition hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
        >
          <span className={`truncate text-sm ${selectedDepartamento ? '' : 'text-zinc-400'}`}>
            {selectedDepartamento ?? 'Selecione um departamento'}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-zinc-400 transition-transform ${isSelectDepartamentoOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isSelectDepartamentoOpen && (
          <div className="bg-background absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-zinc-200 p-1 shadow-lg">
            {DepartamentoOptions.map((departamento) => {
              const isSelected = departamento === selectedDepartamento

              return (
                <button
                  type="button"
                  key={departamento}
                  onClick={() => handleDepartamentoChange(departamento)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100`}
                >
                  <span className="text-sm">{departamento}</span>
                  {isSelected && <span className="text-blue-500">✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="relative w-full gap-1">
        <label htmlFor="cargo" className="text-sm font-medium text-zinc-700">
          Cargo
        </label>
        <button
          type="button"
          id="cargo"
          onClick={() => setIsSelectCargoOpen(!isSelectCargoOpen)}
          disabled={!isCargoHabilitado}
          className={`bg-background flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-200 px-3 text-zinc-700 transition hover:border-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <span className={`truncate text-sm ${selectedCargo ? '' : 'text-zinc-400'}`}>
            {selectedCargo ??
              (isCargoHabilitado ? 'Selecione um cargo' : 'Escolha o departamento primeiro')}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-zinc-400 transition-transform ${isSelectCargoOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isSelectCargoOpen && (
          <div className="bg-background absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-zinc-200 p-1 shadow-lg">
            {CargoOptions.map((cargo) => {
              const isSelected = cargo === selectedCargo

              return (
                <button
                  type="button"
                  key={cargo}
                  onClick={() => handleCargoChange(cargo)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100`}
                >
                  <span className="text-sm">{cargo}</span>
                  {isSelected && <span className="text-blue-500">✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

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
            inputMode="numeric"
            id="salario"
            placeholder="0,00"
            value={''}
            className="bg-background w-full rounded-md border border-zinc-300 py-2 pr-3 pl-10 text-right font-mono text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Data de nascimento</label>
          <input
            type="date"
            id="data-nascimento"
            aria-label="Data de nascimento do funcionário"
            value={''}
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex gap-1">
            <label className="text-sm font-medium text-zinc-700">Admissão</label>
            <span className="text-xs text-zinc-500">(opcional)</span>
          </div>

          <input
            type="date"
            id="data-admissao"
            aria-label="Admissão do funcionário"
            value={''}
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>
    </form>
  )
}
