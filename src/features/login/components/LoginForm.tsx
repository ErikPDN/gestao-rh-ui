import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const LoginForm = () => {
  const [showSenha, setShowSenha] = useState(false)
  const [manterConectado, setManterConectado] = useState(false)

  return (
    <form className="bg-background flex w-full max-w-sm flex-col gap-3 rounded-xl border border-zinc-300 p-4 xl:gap-4 xl:p-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="nome@empresa.com"
          aria-label="Email"
          className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-semibold text-gray-700">
          Senha
        </label>
        <div className="relative flex items-center">
          <input
            id="password"
            type={showSenha ? 'text' : 'password'}
            placeholder="Digite sua senha"
            aria-label="Senha"
            className="bg-background w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
          />

          <button
            type="button"
            onClick={() => setShowSenha(!showSenha)}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-zinc-600 hover:text-zinc-500 focus:outline-none"
          >
            {showSenha ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div className="flex gap-1">
        <label
          htmlFor="manter-conectado"
          className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
        >
          <input
            id="manter-conectado"
            type="checkbox"
            checked={manterConectado}
            onChange={(e) => setManterConectado(e.target.checked)}
            className="size-4 cursor-pointer accent-zinc-900"
          />
          Manter conectado neste dispositivo
        </label>
      </div>

      <button
        type="submit"
        disabled={false}
        className="w-full cursor-pointer rounded-lg bg-zinc-900 px-3 py-2.5 font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Login
      </button>
    </form>
  )
}
