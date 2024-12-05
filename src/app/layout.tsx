import type { Metadata } from 'next'
import { CommonLayout } from '@/components/layouts/CommonLayout'
import ReactQueryProviders from '@/utils/ReactQueryProvider'
import { MswComponent } from '@/components/msw.component'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { cookies } from 'next/headers'
import LoadingScreen from '@/components/layouts/LoadingScreen'

export const metadata: Metadata = {
  title: '리로깅',
  description:
    '리로깅은 플로거들에게 다양한 환경뉴스 및 지자체 플로깅 정보를 제공하고, 플로거들간 커뮤니티가 활성화될 수 있도록 돕습니다.',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const hasToken = !!cookies().get('accessToken')

  return (
    <html lang="ko">
      <body className="bg-white">
        <Suspense fallback={<LoadingScreen />}>
          <ReactQueryProviders>
            <MswComponent />
            <CommonLayout hasToken={hasToken}>
              {children}
              {modal}
              <Toaster />
            </CommonLayout>
          </ReactQueryProviders>
        </Suspense>
      </body>
    </html>
  )
}
