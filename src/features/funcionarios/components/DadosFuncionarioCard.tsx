import { formatCPF } from '../../../lib/utils/cpf-formatter'
import { dateFormatter } from '../../../lib/utils/date-formattet'
import type { NivelCargo } from '../types/nivel-cargo'

interface DadosFuncionarioCardProps {
  funcionarioCpf?: string
  funcionarioNascimento?: Date
  funcionarioNivel?: NivelCargo
  funcionarioDataAdmissao?: Date
  funcionarioDataDemissao?: Date
}

export const DadosFuncionarioCard = ({
  funcionarioCpf,
  funcionarioNascimento,
  funcionarioNivel,
  funcionarioDataAdmissao,
  funcionarioDataDemissao,
}: DadosFuncionarioCardProps) => {
  const rowClass = 'grid grid-cols-[11rem_1fr] items-center border-b border-zinc-200 py-3.5'
  const labelClass = 'text-sm text-zinc-500'
  const valueClass = 'font-mono text-sm text-zinc-900'

  return (
    <div className="bg-background rounded-lg border border-zinc-300 p-5">
      <div className="flex flex-col">
        <h3 className="font-semibold">Dados</h3>

        <div className={rowClass}>
          <span className={labelClass}>CPF</span>
          <span className={valueClass}>{formatCPF(funcionarioCpf ?? '')}</span>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Nascimento</span>
          <span className={valueClass}>
            {funcionarioNascimento ? dateFormatter(new Date(funcionarioNascimento)) : '-'}
          </span>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Nível</span>
          <span className={valueClass}>{funcionarioNivel}</span>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Admissão</span>
          <span className={valueClass}>
            {funcionarioDataAdmissao ? dateFormatter(new Date(funcionarioDataAdmissao)) : '-'}
          </span>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Demissão</span>
          <span className={valueClass}>
            {funcionarioDataDemissao ? dateFormatter(new Date(funcionarioDataDemissao)) : '-'}
          </span>
        </div>
      </div>
    </div>
  )
}
