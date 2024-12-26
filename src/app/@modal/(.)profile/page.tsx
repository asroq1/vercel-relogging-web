'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useCallback, useState } from 'react'
import { useAuthStore, User } from '@/store/authStore'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { validateImage } from '@/utils/image'
import { useToast } from '@/hooks/use-toast'
import { ProfileForm } from './_ProfileForm'
import { ProfileActions } from './_ProfileActions'
import { ProfileImage } from './_ProfileImge'
import EditIcon from '@/assets/icon_edit.svg'

export default function ProfileModalPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuthStore()
  const [userInfo, setUserInfo] = useState<User>(user || ({} as User))
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(user?.image || '')
  const { updateProfile } = useUpdateProfile()
  const { toast } = useToast()

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        try {
          validateImage(file)
          setImageFile(file)
          const url = URL.createObjectURL(file)
          setPreviewUrl(url)
        } catch (error) {
          alert(
            (error as Error)?.message?.toString() ||
              '이미지 업로드에 실패했습니다.',
          )
        }
      }
    },
    [],
  )

  const handleImageRemove = useCallback(() => {
    setImageFile(null)
    setPreviewUrl(user?.image || '')
  }, [user?.image])

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setUserInfo((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [],
  )

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

  if (!user) return null

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="h-dvh w-full max-w-[560px] bg-white p-0 laptop:max-h-[689px]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="justify-center text-center font-semibold">
            {isEditing ? (
              <div className="flex items-center justify-center gap-2">
                <EditIcon /> 프로필 수정
              </div>
            ) : (
              '프로필 관리'
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          <p className="mb-6 whitespace-nowrap text-sm text-gray-600">
            리로깅 내에서 활동하실 닉네임과 프로필사진을 설정해주세요.
          </p>

          <div className="space-y-6">
            <ProfileForm
              isEditing={isEditing}
              userInfo={userInfo}
              onNicknameChange={handleNicknameChange}
            />
            <ProfileImage
              isEditing={isEditing}
              previewUrl={previewUrl}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />
          </div>
        </div>

        <DialogFooter className="p-6 pt-4">
          <ProfileActions
            isEditing={isEditing}
            onUpdate={handleUpdate}
            onEdit={() => setIsEditing(true)}
            onCancel={() => {
              setIsEditing(false)
              setUserInfo(user)
              setPreviewUrl(user.image || '')
            }}
            onClose={() => router.back()}
            isUpdating={updateProfile.isPending}
            isDisabled={!userInfo.nickname}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
