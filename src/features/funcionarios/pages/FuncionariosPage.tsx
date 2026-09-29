import { ButtonAddFuncionario } from '../components/ButtonAddFuncionario'
import { FiltrosFuncionario } from '../components/FiltrosFuncionario'

export default function FuncionariosPage() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Funcionários</h1>
          <p className="text-sm text-zinc-500">Cadastro de colaboradores, cargos e remuneração.</p>
        </div>

        <ButtonAddFuncionario onNovoFuncionario={() => {}} />
      </div>

      <FiltrosFuncionario />
    </div>
  )
}
