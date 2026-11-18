import { Minus } from 'lucide-react'
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

  const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const caculateYearsOfService = (admissionDate: Date): number => {
    const today = new Date()
    let yearsOfService = today.getFullYear() - admissionDate.getFullYear()
    const monthDifference = today.getMonth() - admissionDate.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < admissionDate.getDate())
    ) {
      yearsOfService--
    }

    return yearsOfService
  }

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

          <div className="flex items-center gap-2">
            <span className={valueClass}>
              {funcionarioNascimento ? dateFormatter(new Date(funcionarioNascimento)) : '-'}
            </span>
            <span className="text-xs text-zinc-400">
              {funcionarioNascimento ? calculateAge(new Date(funcionarioNascimento)) : '-'} anos
            </span>
          </div>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Nível</span>
          <span className={valueClass}>{funcionarioNivel}</span>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Admissão</span>

          <div className="flex items-center gap-2">
            <span className={valueClass}>
              {funcionarioDataAdmissao ? dateFormatter(new Date(funcionarioDataAdmissao)) : '-'}
            </span>

            <span className="text-xs text-zinc-400">
              {funcionarioDataAdmissao
                ? caculateYearsOfService(new Date(funcionarioDataAdmissao))
                : '-'}{' '}
              anos de casa
            </span>
          </div>
        </div>

        <div className={rowClass}>
          <span className={labelClass}>Demissão</span>
          <span className={valueClass}>
            {funcionarioDataDemissao ? (
              dateFormatter(new Date(funcionarioDataDemissao))
            ) : (
              <Minus size={14} />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
