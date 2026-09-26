import { CircleUserIcon } from 'lucide-react'
import { SearchBar } from '../../components/SearchBar'

export default function HeaderLayout() {
  return (
    <header className="relative flex h-14 items-center justify-between border-b border-zinc-300 bg-zinc-100 px-6">
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-800">Dashboard</span>

        <div className="flex items-center gap-4">
          <SearchBar />

          {/* TODO: Implementar User Profile Button */}
          <button type="button" className="cursor-pointer" onClick={() => {}}>
            <CircleUserIcon className="h-6 w-6 text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
