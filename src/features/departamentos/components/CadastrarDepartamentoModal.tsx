import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CadastrarDepartamentoModalForm } from './CadastrarDepartamentoModalForm'

interface CadastrarDepartamentoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CadastrarDepartamentoModal = ({
  isOpen,
  onClose,
}: CadastrarDepartamentoModalProps) => {
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
                <h2 className="text-lg font-semibold">Novo Departamento</h2>
                <p className="text-sm text-zinc-500">Crie uma nova área na estrutura da empresa.</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-zinc-500/10"
              >
                <X size={18} />
              </button>
            </header>

            <CadastrarDepartamentoModalForm onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
