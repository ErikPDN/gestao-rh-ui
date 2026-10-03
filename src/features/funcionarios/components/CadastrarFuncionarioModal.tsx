import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CadastrarFuncionarioForm } from './CadastrarFuncionarioForm'

interface CadastrarFuncionarioModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CadastrarFuncionarioModal = ({ isOpen, onClose }: CadastrarFuncionarioModalProps) => {
  return (
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
                <h2 className="text-lg font-semibold">Novo Funcionário</h2>
                <p className="text-sm text-zinc-500">
                  Cadastre um colaborador e vincule-o a um cargo.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-zinc-500/10"
              >
                <X size={18} />
              </button>
            </header>

            <CadastrarFuncionarioForm />

            <footer className="flex justify-end gap-3 border-t border-zinc-300 bg-zinc-100 px-6 py-4">
              <button
                className="bg-background cursor-pointer rounded-md border border-zinc-200 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-500/10"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="form-funcionario"
                className="cursor-pointer rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white"
              >
                Cadastrar
              </button>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
