interface ButtonsEditDepartamentoProps {
  onEdit: () => void
  onDesativar: () => void
  isAtivo: boolean
}

export const ButtonsEditDepartamento = ({
  onEdit,
  onDesativar,
  isAtivo,
}: ButtonsEditDepartamentoProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="bg-background flex cursor-pointer rounded-md border border-zinc-200 px-3 py-1.5 transition-colors duration-75 hover:bg-zinc-500/10"
        onClick={onEdit}
      >
        <span className="text-sm font-medium text-zinc-950">Editar</span>
      </button>

      <button
        className={`flex cursor-pointer rounded-md border border-zinc-200 px-3 py-1.5 transition-colors duration-75 ${isAtivo ? 'bg-background border-red-200 hover:bg-red-500/10' : 'bg-zinc-800 hover:bg-zinc-950'}`}
        onClick={onDesativar}
      >
        <span className={`text-sm font-medium ${isAtivo ? 'text-red-500' : 'text-white'}`}>
          {isAtivo ? 'Desativar' : 'Ativar'}
        </span>
      </button>
    </div>
  )
}
