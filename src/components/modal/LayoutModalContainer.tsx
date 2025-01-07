'use client'

import { useSearchParams } from 'next/navigation'
import AccountModalPage from '@/components/modal/account/page'
import ProfileModalPage from '@/components/modal/profile/page'
import { LoginModal } from '@/components/modal/LoginModal'
import { MyPageModal } from '@/components/modal/MyPageModal'

// 레이아웃에 들어가야 하는 모달은 하단에 추가하면 됩니다.
export default function LayoutModalContainer() {
  const searchParams = useSearchParams()
  const authType = searchParams.get('auth')

  return (
    <>
      {authType === 'login' && <LoginModal />}
      {authType === 'mypage' && <MyPageModal />}
      {authType === 'account' && <AccountModalPage />}
      {authType === 'profile' && <ProfileModalPage />}
    </>
  )
}
