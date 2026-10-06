import { BadgeStatusDepartamento } from './BadgeStatusDepartamento'

interface TabelaDepartamentosProps {
  isLoading: boolean
  departamentos?: any[]
}

export const TabelaDepartamentos = ({ isLoading, departamentos }: TabelaDepartamentosProps) => {
  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100">
              <th className="p-3 text-xs font-medium text-zinc-500">Departamento</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Gestor</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Funcionários</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Cargos</th>
              <th className="p-3 text-xs font-medium text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {departamentos?.map((departamento, index) => (
              <tr className="bg-background cursor-pointer transition-colors duration-75 hover:bg-zinc-100">
                <td className="flex flex-col gap-1 p-3">
                  <span className="text-sm font-medium text-zinc-950">{departamento.nome}</span>
                  <p className="text-xs text-zinc-500">
                    {departamento.descricao ?? 'Sem descrição'}
                  </p>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{departamento.gestor}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">
                    {departamento.quantidadeFuncionarios}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-zinc-500">{departamento.quantidadeCargos}</span>
                </td>
                <td className="p-3">
                  <BadgeStatusDepartamento status={departamento.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
