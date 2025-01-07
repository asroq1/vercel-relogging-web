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
  // 키워드 생성
  const keywords = [
    '환경뉴스',
    '플로깅',
    '환경보호',
    newsDetail.title,
    '환경이슈',
    '지속가능',
    '친환경',
    '기후변화',
    '탄소중립',
    newsDetail.category,
  ].filter(Boolean)
  // 설명 구성
  const description = `
   ${newsDetail.title} - ${newsDetail.aiSummary}
   🏷️ 카테고리: ${newsDetail.category}
   환경 뉴스 더 알아보기
 `.trim()
  return {
    title: `${newsDetail.title} | 환경 뉴스 | 리로깅`,
    description,
    keywords,

    openGraph: {
      title: `${newsDetail.title} - 환경 뉴스`,
      description: newsDetail.aiSummary,
      type: 'article',
      url: `https://re-logging.com/news/${params.id}`,
      images: [
        {
          url: newsDetail?.imagePath ?? '',
          width: 720,
          height: 377,
          alt: newsDetail.imageCaption || '환경 뉴스 이미지',
        },
      ],
      locale: 'ko_KR',
      siteName: '리로깅',
    },

    twitter: {
      card: 'summary_large_image',
      title: newsDetail.title,
      description: newsDetail.aiSummary,
      images: [newsDetail?.imagePath ?? ''],
      creator: '@리로깅',
      site: '@리로깅',
    },

    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
