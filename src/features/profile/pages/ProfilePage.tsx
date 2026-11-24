import { useEffect } from 'react'
import { ProfileInfoCard } from '../components/ProfileInfoCard'
import { ProfilePhotoCard } from '../components/ProfilePhotoCard'
import { useGetMeQuery } from '../hooks/useGetMeQuery'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { data: profileData, isLoading, isError } = useGetMeQuery()

  useEffect(() => {
    if (isError) toast.error('Não foi possível carregar os dados do perfil.')
  }, [isError])

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
        <p className="text-sm text-zinc-500">
          Suas informações de acesso ao painel. Seus dados de funcionário são geridos pelo RH.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-3/4 flex-col space-y-6">
        <ProfilePhotoCard
          userId={profileData?.id ?? ''}
          userName={profileData?.nome}
          userAvatarUrl={profileData?.avatarUrl}
          isLoadingUser={isLoading}
        />
        <ProfileInfoCard
          funcionarioId={profileData?.funcionarioId}
          userName={profileData?.nome}
          userEmail={profileData?.email}
          roles={profileData?.roles}
          cargo={profileData?.cargo}
          departamento={profileData?.departamento}
          isLoadingUser={isLoading}
        />
      </div>
    </div>
  )
}
