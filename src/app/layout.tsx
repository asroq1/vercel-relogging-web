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
  title: {
    template: '%s | 리로깅',
    default: '리로깅 - 플로깅 정보 모음 플랫폼',
  },
  description:
    '리로깅은 플로거들에게 다양한 환경뉴스 및 지자체 플로깅 정보를 제공하고, 플로거들간 커뮤니티가 활성화될 수 있도록 돕습니다.',
  icons: {
    icon: '/icon.ico', // 기본 파비콘
  },
  keywords: ['플로깅', '환경', '운동', '커뮤니티'],
  authors: [{ name: '리로깅' }],
  openGraph: {
    title: '리로깅 - 플로깅 정보 모음 플랫폼',
    description: '플로깅 커뮤니티 플랫폼',
    url: 'https://re-logging.com',
    siteName: '리로깅',
    images: [
      {
        url: '/logo-navi.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'PSccU8hrkwymGRbT_SbTK-iV_Yc541WzVge8HGEqXMo',
    other: {
      'naver-site-verification': '55ea3a8517a9555d04a650fa50c51607faafecb9',
    },
  },
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
              <div id="portal-root"></div>
              <Toaster />
            </CommonLayout>
          </ReactQueryProviders>
        </Suspense>
      </body>
    </html>
  )
}
