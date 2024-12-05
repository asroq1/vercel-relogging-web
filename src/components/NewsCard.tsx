import { NewsArticleCard } from '@/types/INews'
import { getRandomDefaultImage } from '@/constans/images'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useNewsQueries } from '@/hooks/useNewsQueries'

const NewsCard = ({ article }: { article: NewsArticleCard }) => {
  const router = useRouter()
  const {
    // 이전 이벤트, 다음 이벤트
    navigate,
  } = useNewsQueries({})

  const onClickNewsDetail = (type: 'main' | 'side') => {
    if (type === 'side') {
      // mutation 실행
      navigate(
        {
          type: 'side',
          currentId: article.id,
        },
        {
          onSuccess: (article) => {
            router.push(`/news/${article.data.id}`)
          },
          onError: (error: Error) => {
            console.error('Navigation failed:', error)
            // 에러 처리
          },
        },
      )
    } else {
      router.push(`/news/${article.id}`)
    }
  }
  return (
    //카드 컨테이너
    <Card
      onClick={() => onClickNewsDetail('side')}
      key={article?.id}
      className="/* 데스크탑 너비 */ /* 데스크탑 높이 */ flex aspect-[378/175] min-h-[200px] w-full cursor-pointer flex-col gap-4 overflow-hidden p-4 transition-shadow duration-300 hover:shadow-lg laptop:min-h-[200px] laptop:max-w-[378px]"
    >
      {/* 카드 헤더 */}
      <CardHeader className="h-[25%] space-y-0 p-0">
        <p className="text-sm text-textLight">{article?.publishedAt}</p>
        <CardTitle className="mb-2 line-clamp-1 flex-shrink-0 text-lg font-bold text-text">
          {article?.title}
        </CardTitle>
      </CardHeader>
      {/* 카드 컨텐츠 */}
      <CardContent className="flex h-[75%] min-h-0 flex-1 flex-shrink-0 gap-4 p-0">
        <div className="flex flex-[6] items-center">
          <p className="line-clamp-3 overflow-hidden text-xs text-muted-foreground text-text">
            {article?.aiSummary}
          </p>
        </div>
        <div className="relative flex-[4]">
          <Image
            src={article.imagePath ?? getRandomDefaultImage()}
            alt={article?.title}
            fill
            priority
            sizes="w-100 h-100"
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
