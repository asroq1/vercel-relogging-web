import { NewsArticleCard } from '@/types/INews'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { DEFAULT_IMAGES } from '@/constans/images'

interface IEventCardProps {
  article: NewsArticleCard
  styleType: 'grid' | 'side'
  currentPage: number
}
const NewsCard = ({ article, styleType, currentPage }: IEventCardProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const eventDetailId = pathname.split('/').pop()?.toString()
  const isClicked = eventDetailId === article.id.toString()

  const onClickNewsDetail = (id: string) => {
    switch (styleType) {
      case 'side':
        router.push(`/news/${id}?index=${currentPage}`, {
          scroll: false,
        })
        break
      default:
        router.push(`/news/${id}`, {
          scroll: false,
        })
    }
  }
  return (
    //카드 컨테이너
    <Card
      className={`flex aspect-[378/175] min-h-[200px] w-full cursor-pointer flex-col gap-4 overflow-hidden p-4 transition-shadow duration-300 hover:shadow-lg laptop:min-h-[200px] laptop:max-w-[378px] ${
        isClicked
          ? 'border-2 border-green bg-green/5 shadow-md'
          : 'hover:shadow-lg'
      } `}
      onClick={() => onClickNewsDetail(article.id)}
    >
      {/* 카드 헤더 */}
      <CardHeader className="h-[25%] space-y-0 p-0">
        <p className="text-sm text-textLight">{article?.publishedAt}</p>
        <CardTitle className="mb-2 line-clamp-2 flex-shrink-0 text-lg font-bold text-text">
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
            src={article.imagePath ?? DEFAULT_IMAGES.THUMBNAIL}
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
