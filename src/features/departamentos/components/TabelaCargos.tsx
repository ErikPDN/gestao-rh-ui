import { Edit } from 'lucide-react'
import type { CargoResponse } from '../../funcionarios/types/cargo-response'

interface TabelaCargosProps {
  isLoading: boolean
  cargos?: CargoResponse[]
}

export const TabelaCargos = ({ isLoading, cargos }: TabelaCargosProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-300">
      {isLoading ? (
        <></>
      ) : (
        <>
          {cargos && cargos.length !== 0 && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-300 bg-zinc-100">
                  <th className="p-3 text-sm font-medium text-zinc-500">Cargo</th>
                  <th className="p-3 text-sm font-medium text-zinc-500">Faixa Salarial</th>
                  <th className="p-3 text-sm font-medium text-zinc-500">Nível</th>
                  <th className="p-3 text-right text-sm font-medium text-zinc-500">Funcionários</th>
                  <th className="w-12 p-3">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {cargos?.map((cargo) => (
                  <tr
                    key={cargo.id}
                    className="bg-background relative transition-colors duration-75 hover:bg-zinc-100"
                  >
                    <td className="p-3">
                      <span className="text-sm font-medium text-zinc-950">{cargo.nome}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-zinc-500">
                        {`R$ ${cargo.salarioBase.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} - R$ ${cargo.salarioTeto.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-zinc-500">{cargo.nivel}</span>
                    </td>
                    <td className="justify-end p-3 text-right">
                      <span className="text-sm text-zinc-500">{cargo.totalFuncionarios}</span>
                    </td>

                    <td className="w-12 p-3 text-right">
                      <button
                        type="button"
                        aria-label="Editar cargo"
                        className="mt-1 cursor-pointer rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-950"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}
