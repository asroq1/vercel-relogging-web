import { Metadata } from 'next'
import NewsArticleContent from './NewsArticle'

// 메타데이터 생성 함수
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
    title: `${newsDetail.title} | 리로깅`,
    description: newsDetail.aiSummary,
    openGraph: {
      title: newsDetail.title,
      description: newsDetail.aiSummary,
      images: [
        {
          url: newsDetail.imagePath,
          width: 1200,
          height: 630,
          alt: newsDetail.imageCaption || '뉴스 이미지',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: newsDetail.title,
      description: newsDetail.aiSummary,
      images: [newsDetail.imagePath],
    },
  }
}

export default function NewsArticlePage() {
  return <NewsArticleContent />
}
