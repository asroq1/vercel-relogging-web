'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuthStore, User } from '@/store/authStore'
import { EditAccountModalContent } from './_EditAccountModalContent'
import { DeleteAccountModalContent } from './_DeleteAccountModalContent'
import { MainAccountModalContent } from './_MainAccountModalContent'

const AccountModalContent = React.memo(
  ({
    modalType,
    user,
    onTypeChange,
    onCancel,
  }: {
    modalType: 'main' | 'edit' | 'delete'
    user: User
    onTypeChange: (type: 'main' | 'edit' | 'delete') => void
    onCancel: () => void
  }) => {
    const renderContent = () => {
      switch (modalType) {
        case 'main':
          return (
            <MainAccountModalContent
              profileInfo={user}
              onEdit={() => onTypeChange('edit')}
              onDelete={() => onTypeChange('delete')}
              onClose={onCancel}
            />
          )
        case 'edit':
          return (
            <EditAccountModalContent profileInfo={user} onCancel={onCancel} />
          )
        case 'delete':
          return <DeleteAccountModalContent onCancel={onCancel} />
        default:
          return null
      }
    }

    return (
      <DialogContent className="h-dvh w-full max-w-[580px] bg-white laptop:max-h-[689px]">
        {renderContent()}
      </DialogContent>
    )
    // 1. 정적인 타이틀은 여기서 렌더링.
    // 2. 하단에서 스위치로 컨텐츠 내용 다르게 렌더링
  },
)

AccountModalContent.displayName = 'AccountModalContent'
// pages/account/ProfileModalRoute.tsx
export default function AccountModalPage() {
  const router = useRouter()
  const [modalType, setModalType] = useState<'main' | 'edit' | 'delete'>('main')
  const { user } = useAuthStore()

  const handleClose = useCallback(() => {
    router.back()
  }, [router])

  const handleTypeChange = useCallback((type: 'main' | 'edit' | 'delete') => {
    setModalType(type)
  }, [])

  if (!user) return null

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
      <AccountModalContent
        modalType={modalType}
        user={user}
        onTypeChange={handleTypeChange}
        onCancel={handleClose}
      />
    </Dialog>
  )
}

// export default function ProfileModalRoute() {
//   const router = useRouter()
//   const [modalType, setModalType] = useState<'main' | 'edit' | 'delete'>('main')
//   const { user } = useAuthStore()

//   const handleClose = () => {
//     router.back()
//   }

//   return (
//     <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
//       {modalType === 'main' && user && (
//         <MainAccountModal
//           profileInfo={user}
//           onEdit={() => setModalType('edit')}
//           onDelete={() => setModalType('delete')}
//           onClose={handleClose}
//         />
//       )}
//       {modalType === 'edit' && user && (
//         <EditAccountModal
//           profileInfo={user}
//           onCancel={() => setModalType('main')}
//         />
//       )}
//       {modalType === 'delete' && (
//         <DeleteAccountModal onCancel={() => setModalType('main')} />
//       )}
//     </Dialog>
//   )
// }

// function MainAccountModal({
//   profileInfo,
//   onEdit,
//   onDelete,
//   onClose,
// }: {
//   profileInfo: User
//   onEdit: () => void
//   onDelete: () => void
//   onClose: () => void
// }) {
//   return (
//     <DialogContent className="h-dvh w-full max-w-[580px] bg-white laptop:max-h-[689px]">
//       <DialogHeader>
//         <DialogTitle className="flex items-center justify-center">
//           계정 관리
//         </DialogTitle>
//       </DialogHeader>
//       <div className="space-y-6 p-6">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label>
//               이름<span className="text-green">*</span>
//             </Label>
//             <Input value={profileInfo.name} disabled />
//           </div>
//           <div className="flex flex-col gap-4 space-y-2">
//             <Label>
//               이메일
//               <span className="text-green">*</span>
//             </Label>
//             <Input value={profileInfo.email} disabled />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Button
//             className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
//             onClick={onEdit}
//           >
//             수정하기
//           </Button>
//           <Button
//             className="h-[48px] w-full bg-solid text-white hover:bg-gray-300"
//             variant="secondary"
//             onClick={onClose}
//           >
//             닫기
//           </Button>
//           <Button
//             className="h-[48px] w-full bg-white text-textLight"
//             variant="secondary"
//             onClick={onDelete}
//           >
//             계정 탈퇴하기
//           </Button>
//         </div>
//       </div>
//     </DialogContent>
//   )
// }

// // 계정 수정 모달
// function EditAccountModal({
//   profileInfo,
//   onCancel,
// }: {
//   profileInfo: User

//   onCancel: () => void
// }) {
//   const [userInfo, setUserInfo] = useState<User>(profileInfo)
//   const { updateAccount } = useUpdateAccount()
//   const { toast } = useToast()

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleUpdateSubmit = async () => {
//     try {
//       await updateAccount.mutateAsync({
//         name: userInfo.name,
//       })
//       toast({
//         title: '프로필 수정 완료',
//         description: '프로필이 성공적으로 수정되었습니다.',
//         duration: 1500,
//         variant: 'default',
//       })
//       onCancel()
//     } catch (error) {
//       toast({
//         title: '계정 수정 실패',
//         description: '계정 수정 중 오류가 발생했습니다.',
//         variant: 'destructive',
//         duration: 1500,
//       })
//       console.error('프로필 업데이트 오류: ->>>>>>>>>>>>>>>>>>>>', error)
//     }
//   }

//   return (
//     <DialogContent className="h-dvh w-full max-w-[580px] bg-white laptop:max-h-[689px]">
//       <DialogHeader>
//         <DialogTitle className="flex items-center justify-center gap-2">
//           <EditIcon />
//           계정 정보 수정
//         </DialogTitle>
//       </DialogHeader>
//       <div className="space-y-6 p-6">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label>
//               이름<span className="text-green">*</span>
//             </Label>
//             <Input
//               className="radius-none border-b-1 rounded-none border-l-0 border-r-0 border-t-0 bg-white focus:outline-none"
//               value={userInfo.name}
//               name="name"
//               onChange={handleChangeInput}
//             />
//           </div>
//           {/* TODO 이메일 수정 여부에 따라 추가 혹은 삭제 */}
//           {/* <div className="space-y-2">
//             <Label>이메일</Label>
//             <Input
//               className="border-b-1 rounded-none border-l-0 border-r-0 border-t-0 bg-white outline-none focus:outline-none"
//               value={userInfo.email}
//               name="email"
//               onChange={handleChangeInput}
//             />
//           </div> */}
//         </div>
//         <div className="space-y-2">
//           <Button
//             className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
//             onClick={handleUpdateSubmit}
//             disabled={updateAccount.isPending}
//           >
//             {updateAccount.isPending ? '업데이트 중...' : '적용하기'}
//           </Button>
//           <Button
//             className="h-[48px] w-full bg-solid text-white hover:bg-gray-300"
//             variant="secondary"
//             onClick={onCancel}
//           >
//             취소
//           </Button>
//         </div>
//       </div>
//     </DialogContent>
//   )
// }

// function DeleteAccountModal({ onCancel }: { onCancel: () => void }) {
//   // TODO : 탈퇴 사유 입력 필드 추가해서 api로 전달
//   const [reason, setReason] = useState('')
//   const { deleteAccount } = useUpdateAccount()
//   const { toast } = useToast()

//   const handleDeleteSubmit = async () => {
//     try {
//       await deleteAccount.mutateAsync()
//       toast({
//         title: '계정 삭제 완료',
//         description: '계정 삭제가 완료되었습니다.',
//         variant: 'default',
//       })
//       onCancel()
//     } catch (error) {
//       toast({
//         title: '계정 삭제 실패',
//         description: '계정 삭제가 실패하였습니다.',
//         variant: 'destructive',
//       })
//       console.error('계정 삭제 오류:', error)
//     }
//   }

//   return (
//     <DialogContent className="h-dvh w-full max-w-[580px] bg-white laptop:max-h-[689px]">
//       <DialogHeader>
//         <DialogTitle className="flex items-center justify-center">
//           계정 탈퇴
//         </DialogTitle>
//       </DialogHeader>
//       <div className="space-y-6 p-6">
//         <div className="space-y-4">
//           <Label>계정 탈퇴를 진행하시겠습니까?</Label>
//           <Textarea
//             className="resize-none"
//             placeholder="탈퇴를 결심하신 이유 또는 리로깅 서비스가 개선되었으면 하는 점이 있으면 적어주세요."
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             rows={4}
//           />
//         </div>
//         <div className="space-y-2">
//           <Button
//             className="h-[48px] w-full bg-red-500 hover:bg-red-600"
//             onClick={handleDeleteSubmit}
//             disabled={deleteAccount.isPending}
//           >
//             {deleteAccount.isPending ? '탈퇴 중...' : '탈퇴하기'}
//           </Button>
//           <Button
//             className="h-[48px] w-full bg-solid text-white"
//             variant="secondary"
//             onClick={onCancel}
//           >
//             취소
//           </Button>
//         </div>
//       </div>
//     </DialogContent>
//   )
// }
