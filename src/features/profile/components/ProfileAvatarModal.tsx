import { Eye, Trash2, Upload } from 'lucide-react'
import { AvatarOption } from './AvatarOption'

interface ProfileAvatarModalProps {
  isOpen: boolean
  onClose: () => void
  onView: () => void
  onDelete: () => void
  onUpload: () => void
  hasAvatar: boolean
  isDeleteAvatarLoading: boolean
  isUploadAvatarLoading: boolean
}

export const ProfileAvatarModal = ({
  isOpen,
  onClose,
  onView,
  onDelete,
  onUpload,
  hasAvatar,
  isDeleteAvatarLoading,
  isUploadAvatarLoading,
}: ProfileAvatarModalProps) => {
  if (!isOpen) return null

  return (
    <>
      <button type="button" onClick={onClose} className="fixed inset-0 z-40" aria-label="Fechar" />

      <div className="bg-background absolute top-full left-1/2 z-50 mt-2 w-36 -translate-x-1/2 rounded-lg shadow-lg">
        {hasAvatar && (
          <AvatarOption
            icon={
              <>
                <Eye size={16} />
              </>
            }
            label="Ver foto"
            onClick={() => {
              onView()
              onClose()
            }}
          />
        )}

        <AvatarOption
          icon={
            <>
              <Upload size={16} />
            </>
          }
          label="Enviar foto"
          onClick={() => {
            onUpload()
            onClose()
          }}
          disabled={isUploadAvatarLoading}
        />

        {hasAvatar && (
          <AvatarOption
            icon={
              <>
                <Trash2 size={16} />
              </>
            }
            label="Excluir foto"
            onClick={() => {
              onDelete()
              onClose()
            }}
            disabled={isDeleteAvatarLoading}
          />
        )}
      </div>
    </>
  )
}
