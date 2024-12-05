'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EditIcon from '@/assets/icon_edit.svg'
import { useAuthStore, User } from '@/store/authStore'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import IconGarbage from '@/assets/icon_garbage.svg'
import { validateImage } from '@/utils/image'
import { useToast } from '@/hooks/use-toast'
import DEFAULT_PROFILE_IMAGE from '../../../../public/defaultProfile.jpg'

type EditingProfileProps = {
  user: User
  setIsEditing: (value: boolean) => void
  handleClose: () => void
}

function BeforeEditingProfile({
  setIsEditing,
  handleClose,
  user,
}: EditingProfileProps) {
  const handleEditProfile = () => {
    setIsEditing(true)
  }
  return (
    <DialogContent className="h-dvh w-full max-w-[560px] bg-white p-0 laptop:max-h-[689px]">
      <DialogHeader className="p-6 pb-2">
        <div className="flex items-center justify-center">
          <DialogTitle className="text-center font-semibold">
            프로필 관리
          </DialogTitle>
        </div>
      </DialogHeader>
      <div className="px-6 pb-4">
        <p className="mb-6 text-sm text-gray-600">
          리로깅 내에서 활동하실 닉네임과 프로필사진을 설정해주세요.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium">
              닉네임 <span className="text-green">*</span>
            </Label>
            <Input
              disabled
              id="nickname"
              placeholder={user?.nickname}
              className="w-full bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">프로필이미지</Label>
              <Label className="textLight text-textLight">
                이미지 미첨부시 랜덤이미지가 적용됩니다.
              </Label>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="relative h-32 w-32 border-x-solid">
                <Image
                  src={user?.image ?? DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="px-6 py-4">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
          <Button
            className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
            onClick={handleEditProfile}
          >
            수정하기
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
          >
            닫기
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

function AfterEditingProfile({ setIsEditing, user }: EditingProfileProps) {
  const [userInfo, setUserInfo] = useState<User>(user)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(user.image || '')
  const { updateProfile } = useUpdateProfile()
  const { toast } = useToast()

  const handleEditProfile = () => {
    setIsEditing(false)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }
  // 이미지 삭제 핸들러
  const handleImageRemove = () => {
    setImageFile(null)
    setPreviewUrl(user.image || '')
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateSubmit = async () => {
    try {
      await updateProfile.mutateAsync({
        request: { nickname: userInfo.nickname },
        image: imageFile || null,
      })
      toast({
        title: '프로필이 수정되었습니다.',
        description: '프로필이 성공적으로 수정되었습니다.',
        variant: 'default',
        duration: 3000,
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: '프로필 수정에 실패하였습니다.',
        variant: 'destructive',
        duration: 3000,
      })
      console.error('프로필 업데이트 오류:', error)
    }
  }

  useEffect(() => {
    return () => {
      // 미리보기 URL 정리
      if (previewUrl && previewUrl !== user.image) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl, user.image])

  return (
    <DialogContent className="h-dvh w-full max-w-[560px] bg-white p-0 laptop:max-h-[689px]">
      <DialogHeader className="p-6 pb-2">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <EditIcon />
            <DialogTitle className="text-lg font-semibold">
              프로필 수정
            </DialogTitle>
          </div>
        </div>
      </DialogHeader>

      <div className="px-6 pb-4">
        <p className="mb-6 text-sm text-gray-600">
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
              onChange={handleChangeInput}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">프로필이미지</Label>
              <Label className="text-sm font-medium text-textLight">
                이미지 미첨부시 랜덤이미지가 적용됩니다.
              </Label>
            </div>

            {/* 이미지 미리보기 및 업로드 영역 */}
            <div className="relative space-y-4 rounded bg-background p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-6 w-6"
                onClick={handleImageRemove}
              >
                {previewUrl && <IconGarbage className="h-4 w-4" />}
              </Button>
              {previewUrl && (
                <div className="mx-auto h-32 w-32">
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-full w-full rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-image"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="profile-image"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-3 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  {previewUrl ? '이미지 변경하기' : '이미지를 첨부해주세요'}
                </Label>
              </div>

              {/* 이미지 업로드 제한 안내 */}
              <p className="text-xs text-gray-500">
                최대 5MB, jpg/png/gif 파일만 업로드 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="p-6 pt-4">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
          <Button
            className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90 disabled:opacity-50"
            onClick={handleUpdateSubmit}
            disabled={updateProfile.isPending || !userInfo.nickname}
          >
            {updateProfile.isPending ? '적용 중...' : '적용하기'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleEditProfile}
            className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
          >
            취소
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default function ProfileModalPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuthStore()

  const handleExitButton = () => {
    router.back()
  }

  if (!user) return null

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      {isEditing ? (
        <AfterEditingProfile
          setIsEditing={setIsEditing}
          handleClose={handleExitButton}
          user={user}
        />
      ) : (
        <BeforeEditingProfile
          setIsEditing={setIsEditing}
          handleClose={handleExitButton}
          user={user}
        />
      )}
    </Dialog>
  )
}
