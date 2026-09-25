import { CircleUserIcon, LogOutIcon } from 'lucide-react'

export const SidebarFooter = () => {
  return (
    <div className="mt-auto justify-end border-t border-zinc-300">
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="mx-1.5 flex cursor-pointer items-center justify-center gap-2 text-xs font-medium text-zinc-500"
            onClick={() => {}}
          >
            <CircleUserIcon className="h-6 w-6 text-zinc-400" /> {/* TODO: Add user profile */}
            Nome Funcionário
          </button>
        </div>

        <button
          type="button"
          aria-label="Sair"
          onClick={() => {}}
          className="cursor-pointer rounded-full p-2 text-red-500 transition-colors hover:bg-red-100 hover:text-red-600"
        >
          <LogOutIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
