import { Plus } from 'lucide-react'

interface Tabs {
  id: string
  label: string
}

interface TabsDepartamentoProps {
  tabs: Tabs[]
  onChange: (tabId: string) => void
  activeTab: string
  onOpenModalNovoCargo?: () => void
  onOpenModalNovoFuncionario?: () => void
  totalCargos?: number
  totalColaboradores?: number
}

export const TabsDepartamento = ({
  tabs,
  onChange,
  activeTab,
  onOpenModalNovoCargo,
  onOpenModalNovoFuncionario,
  totalCargos = 0,
  totalColaboradores = 0,
}: TabsDepartamentoProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`w-fit cursor-pointer border-b-3 px-1.5 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'border-zinc-600 text-zinc-700'
                : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.id === 'cargos' && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-200 text-xs font-medium text-zinc-700">
                  {totalCargos}
                </span>
              )}
              {tab.id === 'colaboradores' && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-200 text-xs font-medium text-zinc-700">
                  {totalColaboradores}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {activeTab === 'cargos' ? (
        <button
          onClick={onOpenModalNovoCargo}
          className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-900 p-2.5 transition-colors duration-75 hover:bg-zinc-800"
        >
          <Plus size={12} className="text-white" />
          <span className="align-middle text-sm leading-none font-medium text-white">
            Novo Cargo
          </span>
        </button>
      ) : (
        <button
          onClick={onOpenModalNovoFuncionario}
          className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-900 p-2.5 transition-colors duration-75 hover:bg-zinc-800"
        >
          <Plus size={12} className="text-white" />
          <span className="align-middle text-sm leading-none font-medium text-white">
            Novo Funcionário
          </span>
        </button>
      )}
    </div>
  )
}
