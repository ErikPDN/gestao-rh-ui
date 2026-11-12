import { AnimatePresence, motion } from 'framer-motion'
import type { CargoResponse } from '../../funcionarios/types/cargo-response'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { EditCargoForm } from './EditCargoForm'

interface EditCargoModalProps {
  isOpen: boolean
  cargo: CargoResponse | null
  onClose: () => void
}

export const EditCargoModal = ({ cargo, onClose, isOpen }: EditCargoModalProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && cargo && (
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
                <h2 className="text-lg font-semibold">Editar Cargo</h2>
                <p className="text-sm text-gray-500">
                  Alterações de faixa não reajustam salários existentes.
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

            <EditCargoForm cargo={cargo} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
