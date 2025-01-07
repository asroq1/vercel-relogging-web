import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import React from 'react'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { User } from '@/store/authStore'

interface ProfileActionsProps {
  imageFile: File | null
  userInfo: User
  isEditing: boolean
  // onUpdate: () => void
  // onEdit: () => void
  setIsEditing: (isEditing: boolean) => void
  onCancel: () => void
  onClose: () => void
  isUpdating: boolean
  isDisabled: boolean
}

export const ProfileActions = React.memo(
  ({
    imageFile,
    userInfo,
    isEditing,
    // onUpdate,
    setIsEditing,
    onCancel,
    onClose,
    isUpdating,
    isDisabled,
  }: ProfileActionsProps) => {
    const { toast } = useToast()
    const { updateProfile } = useUpdateProfile()

    const handleUpdate = async () => {
  
      try {
        await updateProfile.mutateAsync({
          request: { nickname: userInfo.nickname },
          image: imageFile || null,
        })
        toast({
          title: '프로필이 수정되었습니다.',
          variant: 'default',
          duration: 3000,
        })
        setIsEditing(false)
      } catch (error) {
        toast({
          title: `프로필 수정에 실패하였습니다. | ${error}`,
          variant: 'destructive',
          duration: 3000,
        })
      }
    }

    return (
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
        {isEditing ? (
          <>
            <Button
              className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90 disabled:opacity-50"
              onClick={handleUpdate}
              disabled={isUpdating || isDisabled}
            >
              {isUpdating ? '적용 중...' : '적용하기'}
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
            >
              닫기
            </Button>
          </>
        )}
      </div>
    )
  },
)

ProfileActions.displayName = 'ProfileActions'
