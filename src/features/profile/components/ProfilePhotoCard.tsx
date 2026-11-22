import { useRef } from 'react'
import { Avatar } from '../../../components/Avatar'
import { useMeDeleteAvatarMutation } from '../hooks/useMeDeleteAvatarMutation'
import { useMeUpdateAvatarMutation } from '../hooks/useMeUpdateAvatarMutation'
import { Camera } from 'lucide-react'

interface ProfilePhotoCardProps {
  userId: string
  userName?: string
  userAvatarUrl?: string
  isLoadingUser: boolean
}

export const ProfilePhotoCard = ({
  userId,
  userName,
  userAvatarUrl,
  isLoadingUser,
}: ProfilePhotoCardProps) => {
  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMeUpdateAvatarMutation(userId)
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useMeDeleteAvatarMutation(userId)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isPending = isUpdatingAvatar || isDeletingAvatar

  return (
    <section className="bg-background space-y-4 rounded-lg border border-zinc-300 p-5">
      <div className="flex flex-col">
        <h3 className="font-semibold">Foto de Perfil</h3>
        <p className="text-sm text-zinc-500">
          Aparece no topo do painel e nas listas onde você é gestor(a).
        </p>
      </div>

      <div className="flex flex-col">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
          disabled={isPending || isLoadingUser}
        />

        <div className="flex items-center gap-4">
          <div className="relative">
            <button type="button" className="relative flex cursor-pointer">
              {isPending || isLoadingUser ? (
                <div></div>
              ) : (
                <>
                  <Avatar funcionarioNome={userName} avatarUrl={userAvatarUrl} size="xl" />

                  <div>
                    <Camera
                      size={22}
                      className="absolute right-0 -bottom-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-zinc-300 bg-white p-1 text-zinc-500 hover:bg-zinc-100"
                    />
                  </div>
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            PNG, JPG ou WebP até 5 MB. A imagem é recortada em quadrado.
          </p>
        </div>
      </div>
    </section>
  )
}
