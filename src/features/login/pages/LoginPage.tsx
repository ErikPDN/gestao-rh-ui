import { Logo } from '../../../components/Logo'
import { LoginForm } from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-100 p-6">
      <div className="shrink-0">
        <Logo />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Entrar no Nexo</h1>
          <p className="text-sm text-zinc-600">
            Use seu e-mail corporativo para acessar o sistema.
          </p>
        </div>
        <LoginForm />

        <p className="text-sm text-zinc-500">Sem acesso? Solicite ao time de suporte.</p>
      </div>
    </div>
  )
}
