'use client'

import { CommonModal } from '@/components/modal/CommonModal'
import { useStatusModal } from '@/hooks/useStatusModal'
import { usePathname, useRouter } from 'next/navigation'
import ProfileIcon from '@/assets/icon_profile.svg'
import SettingIcon from '@/assets/icon_setting.svg'
import { useAuthStore } from '@/store/authStore'

export function MyPageModal() {
  const router = useRouter()
  const pathname = usePathname()

  const { isOpen, closeModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })

  const { user, clearAuth } = useAuthStore()
  const handleLocationClick = (location: string) => {
    closeModal()
    router.push(`${pathname}?auth=${location}`)
  }

  const handleLogout = async () => {
    await clearAuth()
    closeModal()
  }

  return (
    <CommonModal
      open={isOpen}
      onClose={handleLogout}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      title={`${user?.name} 님`}
      closeButtonLabel="로그아웃"
      className="z-[10000] flex h-dvh w-full flex-col justify-center bg-white tablet:max-h-[280px] tablet:max-w-[368px] laptop:max-h-[280px] laptop:max-w-[368px]"
      buttonClassName="border-none  justify-end text-base text-textStrong bg-white font-normal"
    >
      <button
        onClick={() => handleLocationClick('profile')}
        className="bg-hover flex justify-start gap-2 rounded-md px-3 py-2 text-base font-normal text-textStrong hover:bg-background hover:text-textLight"
      >
        <ProfileIcon width={24} height={24}></ProfileIcon> 프로필 관리 및 수정
      </button>
      <button
        onClick={() => handleLocationClick('account')}
        className="bg-hover flex justify-start gap-2 rounded-md px-3 py-2 text-base font-normal text-textStrong hover:bg-background hover:text-textLight"
      >
        <SettingIcon width={24} height={24} /> 계정 관리 및 수정
      </button>
    </CommonModal>
  )
}
