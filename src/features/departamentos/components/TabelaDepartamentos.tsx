import { statusToStatusDepartamento } from '../../../lib/utils/status-to-status-departamento'
import type { DepartamentoResponse } from '../types/departamento-response'
import { BadgeStatusDepartamento } from './BadgeStatusDepartamento'

interface TabelaDepartamentosProps {
  isLoading: boolean
  departamentos?: DepartamentoResponse[]
}

export const TabelaDepartamentos = ({ isLoading, departamentos }: TabelaDepartamentosProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300">
      {isLoading ? (
        <></>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100">
              <th className="p-3 text-xs font-medium text-zinc-500">Departamento</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Gestor</th>
              <th className="p-3 text-right text-xs font-medium text-zinc-500">Funcionários</th>
              <th className="p-3 text-right text-xs font-medium text-zinc-500">Cargos</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {departamentos?.map((departamento, index) => (
              <tr
                key={index}
                className="bg-background cursor-pointer transition-colors duration-75 hover:bg-zinc-100"
              >
                <td className="flex flex-col gap-0.5 p-3">
                  <span className="text-sm font-medium text-zinc-950">{departamento.nome}</span>
                  <p className="text-xs text-zinc-500">
                    {departamento.descricao ?? 'Sem descrição'}
                  </p>
                </td>
                <td className="p-3">
                  <span
                    className={`text-sm ${departamento.gestorNome ? 'text-zinc-950' : 'text-zinc-500'}`}
                  >
                    {departamento.gestorNome ?? 'Sem gestor'}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <span className="text-sm text-zinc-500">{departamento.totalFuncionarios}</span>
                </td>
                <td className="p-3 text-right">
                  <span className="text-sm text-zinc-500">{departamento.totalCargos}</span>
                </td>
                <td className="p-3">
                  <BadgeStatusDepartamento
                    status={statusToStatusDepartamento(departamento.ativo)}
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
