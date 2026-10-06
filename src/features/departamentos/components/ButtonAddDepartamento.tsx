import { Plus } from 'lucide-react'

interface ButtonAddDepartamentoProps {
  onNovoDepartamentoClick: () => void
}

export const ButtonAddDepartamento = ({ onNovoDepartamentoClick }: ButtonAddDepartamentoProps) => {
  return (
    <button
      type="button"
      onClick={onNovoDepartamentoClick}
      className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-900 p-2.5 transition-colors duration-75 hover:bg-zinc-800"
    >
      <Plus size={12} className="mb-0.5 text-white" />
      <span className="align-middle text-sm leading-none font-medium text-white">
        Novo Departamento
      </span>
    </button>
  )
}
