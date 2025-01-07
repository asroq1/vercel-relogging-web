import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'
import IconGarbage from '@/assets/icon_garbage.svg'
import { User } from '@/store/authStore'

interface ProfileImageProps {
  userInfo: User | null
  isEditing: boolean
  previewUrl: string
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onImageRemove: () => void
}

export const ProfileImage = React.memo(
  ({
    userInfo,
    isEditing,
    previewUrl,
    onImageChange,
    onImageRemove,
  }: ProfileImageProps) => {
    // const [previewUrl, setPreviewUrl] = useState<string>(user?.image || '')
    // const [imageFile, setImageFile] = useState<File | null>(null)

    // const handleImageChange = useCallback(
    //   async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (file) {
    //       try {
    //         validateImage(file)
    //         setImageFile(file)
    //         const url = URL.createObjectURL(file)
    //         setPreviewUrl(url)
    //       } catch (error) {
    //         alert(
    //           (error as Error)?.message?.toString() ||
    //             '이미지 업로드에 실패했습니다.',
    //         )
    //       }
    //     }
    //   },
    //   [],
    // )

    // const handleImageRemove = useCallback(() => {
    //   setImageFile(null)
    //   setPreviewUrl(user?.image || '')
    // }, [user?.image])

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="whitespace-nowrap text-sm font-medium">
            프로필이미지
          </Label>
          <Label className="whitespace-nowrap text-xs font-light text-textLight">
            이미지 미첨부시 랜덤이미지가 적용됩니다.
          </Label>
        </div>

        <div className="relative space-y-4 rounded bg-background p-4">
          {isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-6 w-6"
              onClick={onImageRemove}
            >
              {previewUrl && <IconGarbage className="h-4 w-4" />}
            </Button>
          )}

          <div className="mx-auto h-32 w-32">
            <Image
              src={userInfo?.image || '/defaultProfile.png'}
              alt="Profile preview"
              className="h-full w-full rounded-full object-cover"
              width={100}
              height={100}
            />
          </div>

          {isEditing && <ImageUploadControls onImageChange={onImageChange} />}
        </div>
      </div>
    )
  },
)

const ImageUploadControls = React.memo(
  ({
    onImageChange,
  }: {
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-image"
          onChange={onImageChange}
        />
        <Label
          htmlFor="profile-image"
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-3 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          이미지를 첨부해주세요
        </Label>
      </div>
      <p className="text-xs text-gray-500">
        최대 5MB, jpg/png/gif 파일만 업로드 가능합니다.
      </p>
    </>
  ),
)

ProfileImage.displayName = 'ProfileImage'
ImageUploadControls.displayName = 'ImageUploadControls'
