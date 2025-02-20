import type { Metadata } from 'next'
import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { AuthButtons } from '../AuthButtons'
import LayoutModalContainer from '@/components/modal/LayoutModalContainer'

export const metadata: Metadata = {
  title: 'Relogging',
  description:
    '리로깅은 플로거들에게 다양한 환경뉴스 및 지자체 플로깅 정보를 제공하고, 플로거들간 커뮤니티가 활성화될 수 있도록 돕습니다.',
}

export function CommonLayout({
  children,
  hasToken,
}: Readonly<{
  children: React.ReactNode
  hasToken: boolean
}>) {
  return (
    <>
      <nav className="fixed top-0 z-[9999] flex h-full max-h-[60px] w-full items-center justify-between bg-white p-5 laptop:h-16">
        <div>
          <Link href="/" className="text-xl font-bold">
            <Image
              src={'/logo-navi.png'}
              alt="상단 심볼 로고"
              width={40}
              height={40}
              priority
              style={{ width: 'auto', height: 'auto' }} // 자동 크기 조정
            />
          </Link>
        </div>
        {/* 데스크탑 로그인 버튼 */}
        <AuthButtons initHasToken={hasToken} />
        {/* 모바일 햄버거 메뉴 */}
        {/* <div className="laptop:hidden">
              <MobileNav />
            </div> */}
      </nav>
      <LayoutModalContainer />
      <main>{children}</main>
      {/* <footer>푸터</footer> */}
    </>
  )
}
