import NewsSidebar from '@/app/news/[id]/_NewsSidebar'
import { Metadata } from 'next'
import { NewsDetailSection } from '@/app/news/[id]/_NewsDetailSection'

// news 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${params.id}`,
  )
  const newsDetail = await response.json()

  return {
    title: `리로깅 - ${newsDetail.title ?? ''}`,
    description: `리로깅 - ${newsDetail.aiSummary ?? ''}`,
    openGraph: {
      title: `리로깅 - ${newsDetail.title ?? ''}`,
      description: `리로깅 - ${newsDetail.aiSummary ?? ''}`,
      images: [
        {
          url: newsDetail?.imagePath ?? '',
          width: 1200,
          height: 630,
          alt: `리로깅 - ${newsDetail.imageCaption ?? ''}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `리로깅 - ${newsDetail.title ?? ''}`,
      description: `리로깅 - ${newsDetail.aiSummary ?? ''}`,
      images: [newsDetail?.imagePath ?? ''],
    },
  }
}

export default function NewsArticlePage() {
  return (
    <article className="m-auto mt-16 flex h-auto w-full max-w-7xl gap-6 bg-white p-5">
      <div className="flex w-full gap-6">
        {/* 왼쪽 섹션 (7/10) */}
        <div className="w-full min-w-0 laptop:flex-[8]">
          <NewsDetailSection />
        </div>
        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />
        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <NewsSidebar />
        </div>
      </div>
    </article>
  )
}
