import { Button } from '@/components/ui/button'
import React from 'react'

interface ProfileActionsProps {
  isEditing: boolean
  onUpdate: () => void
  onEdit: () => void
  onCancel: () => void
  onClose: () => void
  isUpdating: boolean
  isDisabled: boolean
}

export const ProfileActions = React.memo(
  ({
    isEditing,
    onUpdate,
    onEdit,
    onCancel,
    onClose,
    isUpdating,
    isDisabled,
  }: ProfileActionsProps) => (
    <div className="mx-auto flex w-full max-w-[400px] flex-col gap-2">
      {isEditing ? (
        <>
          <Button
            className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90 disabled:opacity-50"
            onClick={onUpdate}
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
            onClick={onEdit}
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
  ),
)

ProfileActions.displayName = 'ProfileActions'
