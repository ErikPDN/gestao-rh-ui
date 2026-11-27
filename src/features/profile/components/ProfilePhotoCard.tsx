import { useRef, useState, type ChangeEvent } from 'react'
import { Avatar } from '../../../components/Avatar'
import { useMeDeleteAvatarMutation } from '../hooks/useMeDeleteAvatarMutation'
import { useMeUpdateAvatarMutation } from '../hooks/useMeUpdateAvatarMutation'
import { Camera } from 'lucide-react'
import { ProfileAvatarModal } from './ProfileAvatarModal'
import { toast } from 'sonner'

interface ProfilePhotoCardProps {
  userName?: string
  userAvatarUrl?: string
  isLoadingUser: boolean
}

const MAX_AVATAR_SIZE = 2 * 1024 * 1024

export const ProfilePhotoCard = ({
  userName,
  userAvatarUrl,
  isLoadingUser,
}: ProfilePhotoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useMeUpdateAvatarMutation()
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useMeDeleteAvatarMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isPending = isUpdatingAvatar || isDeletingAvatar

  const handleAvatarClick = () => {
    setIsModalOpen(true)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (file.size > MAX_AVATAR_SIZE) {
      toast.error('O tamanho do arquivo excede o limite de 2 MB.')
      return
    }

    updateAvatar({ file })
  }

  const handleViewAvatar = () => {
    if (userAvatarUrl) window.open(userAvatarUrl, '_blank')
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDeleteClick = () => {
    deleteAvatar()
  }

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
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          disabled={isPending || isLoadingUser}
          onChange={handleFileChange}
        />

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isPending || isLoadingUser}
              className="relative flex cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending || isLoadingUser ? (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-300">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
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

            <ProfileAvatarModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onView={handleViewAvatar}
              onDelete={handleDeleteClick}
              onUpload={handleUploadClick}
              hasAvatar={!!userAvatarUrl}
              isDeleteAvatarLoading={isDeletingAvatar}
              isUploadAvatarLoading={isUpdatingAvatar}
            />
          </div>

          <p className="text-sm text-zinc-400">
            PNG, JPG ou WebP até 2 MB. A imagem é exibida em formato circular.
          </p>
        </div>
      </div>
    </section>
  )
}
