'use client'

import EventListGrid from '@/components/EventListGrid'
import NewsListGrid from '@/components/NewsListGrid'
import { useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/layouts/Footer'

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
  const [activeTab, setActiveTab] = useState('지자체 플로깅')
  // max-w-[1440px]
  return (
    <div className="h-full w-full bg-background">
      <section className="margin-auto hidden w-dvw laptop:block">
        <Image
          {...images.desktop}
          alt="로고 이미지"
          priority
          quality={100}
          sizes="(min-width: 1200px) 100vw"
          className="h-auto w-full"
        />
      </section>
      <section className="hidden tablet:block laptop:hidden">
        <Image
          {...images.tablet}
          alt="로고 이미지"
          priority
          quality={100}
          sizes="(min-width: 600px) and (max-width: 1199px) 100vw"
          className="h-auto w-full"
        />
      </section>
      <section className="block tablet:hidden">
        <Image
          {...images.mobile}
          alt="로고 이미지"
          priority
          quality={100}
          sizes="(max-width: 599px) 100vw"
          className="h-auto w-full"
        />
      </section>
      {/* 메인 콘텐츠 */}
      <div className="m-auto h-full w-full max-w-7xl bg-white">
        <main className="mx-auto max-w-7xl laptop:mt-16">
          {/* 탭 섹션 */}
          <div className="rounded-lg bg-white p-5 shadow laptop:p-10">
            <div className="mb-4 flex border-b border-gray-200">
              <button
                className={`block px-6 py-4 text-gray-600 hover:text-textLight focus:outline-none ${
                  activeTab === '지자체 플로깅'
                    ? 'border-b-2 border-text font-medium text-blue-500'
                    : ''
                }`}
                onClick={() => setActiveTab('지자체 플로깅')}
              >
                지자체 플로깅
              </button>
              <button
                className={`block px-6 py-4 text-gray-600 hover:text-textLight focus:outline-none ${
                  activeTab === '환경 뉴스'
                    ? 'border-b-2 border-text font-medium text-blue-500'
                    : ''
                }`}
                onClick={() => setActiveTab('환경 뉴스')}
              >
                환경 뉴스
              </button>
            </div>
            {activeTab === '지자체 플로깅' && <EventListGrid />}
            {/* 뉴스 그리드 */}
            {activeTab === '환경 뉴스' && <NewsListGrid />}
            {/* 지자체 행사 그리드 */}
            {/* )} */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
