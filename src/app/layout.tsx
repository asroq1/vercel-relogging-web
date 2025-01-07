import type { Metadata } from 'next'
import { CommonLayout } from '@/components/layouts/CommonLayout'
import ReactQueryProviders from '@/utils/ReactQueryProvider'
import { MswComponent } from '@/components/msw.component'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { cookies } from 'next/headers'
import LoadingScreen from '@/components/layouts/LoadingScreen'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: '%s | 리로깅',
    default: '리로깅 - 대한민국 1등 플로깅 정보 커뮤니티 플랫폼',
  },
  description:
    '리로깅에서 다양한 플로깅 모임과 환경 뉴스를 만나보세요. 플로깅 일정, 장소, 커뮤니티 정보부터 환경보호 활동까지 한눈에 확인할 수 있습니다. 함께 달리며 환경을 보호하는 플로거들의 공간, 리로깅입니다.',
  icons: {
    icon: '/icon.ico', // 기본 파비콘
    apple: '/icon.ico', // Apple 터치 아이콘
    shortcut: '/icon.ico', // IE용 아이콘
  },
  keywords: [
    '플로깅',
    '조깅',
    '환경보호',
    '쓰레기줍기',
    '러닝',
    '환경운동',
    '환경뉴스',
    '플로깅모임',
    '지역플로깅',
    '건강운동',
    '환경커뮤니티',
    '플로거',
    '친환경활동',
    '자원봉사',
    '지역봉사',
  ],
  authors: [{ name: '리로깅', url: 'https://re-logging.com' }],
  creator: '리로깅',
  publisher: '리로깅',
  category: '환경,운동,커뮤니티',
  openGraph: {
    title: '리로깅 - 대한민국 대표 플로깅 커뮤니티',
    description:
      '플로깅 모임부터 환경 뉴스까지, 플로거들을 위한 모든 것. 지금 리로깅에서 시작하세요.',
    url: 'https://re-logging.com',
    siteName: '리로깅',
    images: [
      {
        url: '/mobileBanner.png',
        width: 720,
        height: 377,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    // 트위터 공유 시 표시
    card: 'summary_large_image',
    title: '리로깅 - 플로깅 커뮤니티 플랫폼',
    images: ['/logo-navi.png'],
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
  other: {
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
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
      <body suppressHydrationWarning className="bg-white">
        <Analytics />
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
