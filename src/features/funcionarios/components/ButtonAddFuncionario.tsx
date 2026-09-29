import { Plus } from 'lucide-react'

interface ButtonAddFuncionarioProps {
  onNovoFuncionario: () => void
}

export const ButtonAddFuncionario = ({ onNovoFuncionario }: ButtonAddFuncionarioProps) => {
  return (
    <button
      onClick={onNovoFuncionario}
      className="flex w-fit cursor-pointer items-center justify-center gap-1 rounded-md bg-zinc-900 p-2.5 transition-colors duration-75 hover:bg-zinc-800"
    >
      <Plus className="mb-0.5 h-3 w-3 text-white" />
      <span className="align-middle text-sm leading-none font-medium text-white">
        Novo Funcionário
      </span>
    </button>
  )
}
