import { formatCurrency } from '../../../lib/utils/currency-formatter'

interface RemuneracaoFuncionarioCardProps {
  funcionarioSalario?: number
  cargoSalarioBase?: number
  cargoSalarioTeto?: number
}

export const RemuneracaoFuncionarioCard = ({
  funcionarioSalario,
  cargoSalarioBase,
  cargoSalarioTeto,
}: RemuneracaoFuncionarioCardProps) => {
  const salario = funcionarioSalario ?? 0
  const base = cargoSalarioBase ?? 0
  const teto = cargoSalarioTeto ?? 0
  const faixa = teto - base
  const progresso = faixa > 0 ? Math.min(Math.max((salario - base) / faixa, 0), 1) * 100 : 0

  return (
    <div className="bg-background rounded-lg border border-zinc-300 p-5">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold">Remuneração</h3>

        <div className="flex flex-col">
          <span className="font-mono text-2xl font-medium text-zinc-950">
            {formatCurrency(salario)}
          </span>
          <span className="text-sm text-zinc-400">salário bruto mensal</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full rounded-full bg-blue-600" style={{ width: `${progresso}%` }} />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-sm text-zinc-600">{formatCurrency(base)}</span>
              <span className="text-sm text-zinc-400">salário base</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-sm text-zinc-600">{formatCurrency(teto)}</span>
              <span className="text-sm text-zinc-400">salário teto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
