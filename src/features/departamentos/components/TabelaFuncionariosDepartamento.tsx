import { NavLink } from 'react-router-dom'
import { TabelaFuncionariosSkeleton } from '../../funcionarios/components/TabelaFuncionariosSkeleton'
import type { FuncionarioResponse } from '../../funcionarios/types/funcionario-response'
import { formatCurrency } from '@brazilian-utils/brazilian-utils'
import { BadgeStatusFuncionario } from '../../funcionarios/components/BadgeStatusFuncionario'
import { dateToStatusFuncionario } from '../../../lib/utils/date-to-status-funcionario'

interface TabelaFuncionariosDepartamentoProps {
  funcionarios: FuncionarioResponse[]
  isLoading: boolean
}

export const TabelaFuncionariosDepartamento = ({
  funcionarios,
  isLoading,
}: TabelaFuncionariosDepartamentoProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300">
      {isLoading ? (
        <TabelaFuncionariosSkeleton />
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100">
              <th className="p-3 text-xs font-medium text-zinc-500">Nome</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Cargo</th>
              <th className="p-3 text-right text-xs font-medium text-zinc-500">Salário</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios?.map((funcionario) => (
              <tr
                key={funcionario.id}
                className="bg-background relative cursor-pointer transition-colors duration-75 hover:bg-zinc-100"
              >
                <td className="p-3">
                  <NavLink
                    to={`/funcionarios/${funcionario.id}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="text-sm font-medium text-zinc-950">{funcionario.nome}</span>
                  </NavLink>
                </td>

                <td className="p-3">
                  <span className="text-sm font-medium text-zinc-500">{funcionario.cargo}</span>
                </td>
                <td className="justify-end p-3 text-right">
                  <span className="font-mono text-sm font-medium text-zinc-950">
                    {formatCurrency(Number(funcionario.salario))}
                  </span>
                </td>
                <td className="p-3">
                  <BadgeStatusFuncionario
                    status={dateToStatusFuncionario(funcionario.dataDemissao || null)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
