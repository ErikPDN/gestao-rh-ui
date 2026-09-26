import { LogOutIcon } from 'lucide-react'

export const SidebarFooter = () => {
  return (
    <div className="mt-auto justify-end px-4">
      <button
        type="button"
        aria-label="Sair"
        onClick={() => {}}
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-500"
      >
        <LogOutIcon className="mb-1 h-4 w-4 text-red-500" />
        Sair
      </button>
    </div>
  )
}
