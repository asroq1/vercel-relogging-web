// components/account/AccountActions.tsx

import { Button } from '@/components/ui/button'
import React from 'react'

interface AccountActionsBaseProps {
  onCancel: () => void
}

// 메인 계정 관리 화면의 액션 버튼들
interface MainAccountActionsProps {
  onEdit: () => void
  onClose: () => void
  onDelete: () => void
}

export const AccountActions = React.memo(
  ({ onEdit, onClose, onDelete }: MainAccountActionsProps) => {
    return (
      <div className="space-y-2">
        <Button
          className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
          onClick={onEdit}
        >
          수정하기
        </Button>
        <Button
          className="h-[48px] w-full bg-solid text-white hover:bg-gray-300"
          variant="secondary"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          className="h-[48px] w-full bg-white text-textLight"
          variant="secondary"
          onClick={onDelete}
        >
          계정 탈퇴하기
        </Button>
      </div>
    )
  },
)

AccountActions.displayName = 'AccountActions'

// 수정 화면의 액션 버튼들
interface EditAccountActionsProps extends AccountActionsBaseProps {
  onSubmit: () => void
  isSubmitting: boolean
}

export const EditAccountActions = React.memo(
  ({ onSubmit, onCancel, isSubmitting }: EditAccountActionsProps) => {
    return (
      <div className="space-y-2">
        <Button
          className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '업데이트 중...' : '적용하기'}
        </Button>
        <Button
          className="h-[48px] w-full bg-solid text-white hover:bg-gray-300"
          variant="secondary"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    )
  },
)

EditAccountActions.displayName = 'EditAccountActions'

// 삭제 화면의 액션 버튼들
interface DeleteAccountActionsProps extends AccountActionsBaseProps {
  onSubmit: () => void
  isSubmitting: boolean
}

export const DeleteAccountActions = React.memo(
  ({ onSubmit, onCancel, isSubmitting }: DeleteAccountActionsProps) => {
    return (
      <div className="space-y-2">
        <Button
          className="h-[48px] w-full bg-red-500 hover:bg-red-600"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '탈퇴 중...' : '탈퇴하기'}
        </Button>
        <Button
          className="h-[48px] w-full bg-solid text-white hover:bg-gray-300"
          variant="secondary"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    )
  },
)

DeleteAccountActions.displayName = 'DeleteAccountActions'
