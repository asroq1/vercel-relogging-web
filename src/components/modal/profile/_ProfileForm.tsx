import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/store/authStore'
import React, { useCallback, useState } from 'react'
import { ProfileImage } from './_ProfileImge'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import EditIcon from '@/assets/icon_edit.svg'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { ProfileActions } from './_ProfileActions'
import { validateImage } from '@/utils/image'

interface ProfileFormProps {
  // isEditing: boolean
  user: User | null
  closeModal: () => void
}

export const ProfileForm = React.memo(
  ({ user, closeModal }: ProfileFormProps) => {
    const { updateProfile } = useUpdateProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState<User>(user || ({} as User))
    const [previewUrl, setPreviewUrl] = useState<string>(user?.image || '')
    const [imageFile, setImageFile] = useState<File | null>(null)

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
    const handleImageChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          try {
            validateImage(file)
            setImageFile(file)
            const url = URL.createObjectURL(file)
            setUserInfo((prev) => ({
              ...prev,
              image: url,
            }))
            setPreviewUrl(url)
          } catch (error) {
            alert(
              (error as Error)?.message?.toString() ||
                '이미지 업로드에 실패했습니다.',
            )
          }
        }
      },
      [setUserInfo],
    )

    const handleImageRemove = useCallback(() => {
      setImageFile(null)
      setPreviewUrl(user?.image || '')
    }, [user?.image])

    return (
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
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                닉네임 <span className="text-green">*</span>
              </Label>
              <Input
                className="h-10 w-full"
                value={userInfo?.nickname}
                name="nickname"
                onChange={handleNicknameChange}
                disabled={!isEditing}
              />
            </div>
            <ProfileImage
              userInfo={userInfo}
              isEditing={isEditing}
              previewUrl={previewUrl}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />
          </div>
        </div>
        <DialogFooter className="p-6 pt-4">
          <ProfileActions
            imageFile={imageFile}
            userInfo={userInfo}
            isEditing={isEditing}
            // onUpdate={handleUpdate}
            setIsEditing={setIsEditing}
            onCancel={() => {
              setIsEditing(false)
              // setPreviewUrl(user.image || '')
            }}
            onClose={closeModal}
            isUpdating={updateProfile.isPending}
            isDisabled={!user?.nickname}
          />
        </DialogFooter>
      </DialogContent>
    )
  },
)
ProfileForm.displayName = 'ProfileForm'
