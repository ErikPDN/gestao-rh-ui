import { AnimatePresence, motion } from 'framer-motion'

interface ConfirmDialogProps {
  open: boolean
  onCancel: () => void
  title: string
  description?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => void
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

export const ConfirmDialog = ({
  open,
  onCancel,
  title,
  description,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  onConfirm,
  isLoading = false,
  variant = 'primary',
}: ConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-around">
          <motion.button
            aria-label="Fechar modal"
            onClick={onCancel}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="bg-background relative w-full max-w-sm rounded-2xl p-5 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="mt-2 text-sm font-medium text-zinc-500">{description}</p>}

            <div className="mt-10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="bg-background cursor-pointer rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-medium transition-colors duration-75 hover:bg-zinc-500/10"
              >
                {cancelButtonText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`${
                  variant === 'primary'
                    ? 'bg-zinc-900 text-white hover:bg-zinc-500'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-75 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {confirmButtonText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
