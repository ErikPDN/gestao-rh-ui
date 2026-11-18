import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { EditFuncionarioForm } from './EditFuncionarioForm'

interface EditFuncionarioModalProps {
  isOpen: boolean
  onClose: () => void
  funcionarioCpf: string
  funcionarioNome: string
  funcionarioDepartamentoId: string
  funcionarioCargoId: string
  funcionarioSalario: number
  funcionarioDataNascimento?: Date
  funcionarioDataAdmissao?: Date
}

export const EditFuncionarioModal = ({
  isOpen,
  onClose,
  funcionarioCpf,
  funcionarioNome,
  funcionarioDepartamentoId,
  funcionarioCargoId,
  funcionarioSalario,
  funcionarioDataNascimento,
  funcionarioDataAdmissao,
}: EditFuncionarioModalProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.button
            aria-label="Fechar modal"
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            className="bg-background absolute inset-y-0 right-0 flex w-full max-w-110 flex-col shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <header className="flex items-start justify-between border-b border-zinc-300 px-6 py-5">
              <div className="">
                <h2 className="text-lg font-semibold">Editar Funcionário</h2>
                <p className="text-sm text-gray-500">Atualize os dados do funcionário</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-zinc-500/10"
              >
                <X size={18} />
              </button>
            </header>

            <EditFuncionarioForm
              onClose={onClose}
              funcionarioCpf={funcionarioCpf}
              funcionarioNome={funcionarioNome}
              funcionarioDepartamentoId={funcionarioDepartamentoId}
              funcionarioCargoId={funcionarioCargoId}
              funcionarioSalario={funcionarioSalario}
              funcionarioDataNascimento={funcionarioDataNascimento}
              funcionarioDataAdmissao={funcionarioDataAdmissao}
            />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
