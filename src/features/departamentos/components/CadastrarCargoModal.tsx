import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CadastrarCargoModalForm } from './CadastrarCargoForm'
import { createPortal } from 'react-dom'

interface CadastrarCargoModalProps {
  isOpen: boolean
  departamentoId: string
  onClose: () => void
}

export const CadastrarCargoModal = ({
  isOpen,
  departamentoId,
  onClose,
}: CadastrarCargoModalProps) => {
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
              <div>
                <h2 className="text-lg font-semibold">Novo Cargo</h2>
                <p className="text-sm text-zinc-500">Crie um novo cargo para o departamento.</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-zinc-500/10"
              >
                <X size={18} />
              </button>
            </header>

            <CadastrarCargoModalForm departamentoId={departamentoId} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
