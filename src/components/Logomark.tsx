import { Logo } from './Logo'

export const Logomark = () => {
  return (
    <div className="ml-2 flex items-center gap-2 px-4 py-2">
      <Logo />
      <h2 className="text-lg font-bold">Nexo</h2>
    </div>
  )
}
