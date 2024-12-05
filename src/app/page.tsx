'use client'

import Image from 'next/image'
import Footer from '@/components/layouts/Footer'
import { useRouter, useSearchParams } from 'next/navigation'
import MeetupList from '@/components/MeetupList'
import EventListGrid from '@/components/EventListGrid'
import NewsListGrid from '@/components/NewsListGrid'

const images = {
  mobile: {
    src: '/mobileBanner.png',
    width: 500,
    height: 500,
  },
  tablet: {
    src: '/mobileBanner.png',
    width: 768,
    height: 768,
  },
  desktop: {
    src: '/laptopBanner.png',
    width: 1000,
    height: 1000,
  },
} as const

export default function Home() {
  const router = useRouter()
  const searchParms = useSearchParams()
  const currentTab = searchParms.get('tab') || 'ploggingEvent'
  const tabList = [
    { id: 'ploggingEvent', label: '우리 동네 플로깅' },
    { id: 'meetup', label: '플로깅 모임' },
    { id: 'news', label: '뉴스' },
  ]

  const handleTabChange = (tabId: string) => {
    router.replace(`/?tab=${tabId}`, { scroll: false })
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'ploggingEvent':
        return <EventListGrid />
      case 'news':
        return <NewsListGrid />
      case 'meetup':
        return <MeetupList />
      default:
        return <EventListGrid />
    }
  }
  return (
    <div className="h-full w-full bg-background">
      <section className="margin-auto hidden w-dvw laptop:block">
        <Image
          {...images.desktop}
          alt="로고 이미지"
          priority
          sizes="(min-width: 1200px) 100vw"
          className="h-auto max-h-[548px] w-full object-cover"
        />
      </section>
      <section className="hidden tablet:block laptop:hidden">
        <Image
          {...images.tablet}
          alt="로고 이미지"
          priority
          sizes="(min-width: 600px) and (max-width: 1199px) 100vw"
          className="h-auto max-h-[548px] w-full object-cover"
        />
      </section>
      <section className="block tablet:hidden">
        <Image
          {...images.mobile}
          alt="로고 이미지"
          priority
          sizes="(max-width: 599px) 100vw  max-h-[700px]"
          className="h-auto max-h-[548px] w-full object-cover"
        />
      </section>
      {/* 메인 콘텐츠 */}
      <div className="m-auto h-full w-full max-w-7xl bg-white">
        <main className="mx-auto max-w-7xl laptop:mt-16">
          {/* 탭 섹션 */}
          <div className="rounded-lg bg-white p-5 shadow laptop:p-10">
            <div className="mb-4 flex">
              {tabList.map((tab) => {
                return (
                  <button
                    key={tab.id}
                    className={`block whitespace-nowrap px-6 pb-1 pt-4 text-gray-600 hover:text-textLight ${
                      tab.id === currentTab
                        ? 'border-b-2 border-green font-medium text-text'
                        : ''
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
            {/* 콘텐츠 섹션 */}
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
