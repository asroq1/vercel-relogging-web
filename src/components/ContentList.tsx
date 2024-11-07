import { NewsArticleCard } from '@/types/INews'
import { ContentsPagination } from './ContentsPagination'
import NewsCard from './NewsCard'
import { EventCard } from './ui/EventCard'
import { EventContentCard } from '@/types/IEvent'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import { ErrorAlert } from './status/ErrorAlert'
import { EmptyState } from './status/EmptyStatus'

interface IContentList {
  contentData: (NewsArticleCard | EventContentCard)[]
  eventType: 'news' | 'events'
  styleType: 'grid' | 'side'
  currentPage: number
  totalPage: number
  handlePageChange: (newPage: number) => void
  cotentListIsLoading?: boolean
  contentListIsError?: boolean
  contentListError?: Error
}

const ContentList = ({
  contentData,
  eventType,
  styleType,
  totalPage,
  currentPage,
  handlePageChange,
  contentListError,
  cotentListIsLoading,
  contentListIsError,
}: IContentList) => {
  const layoutStyles = {
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-3',
    side: 'hidden flex-[2] space-y-4 laptop:block',
  }

  const paginationStyles = {
    grid: 'mt-6 flex justify-center w-full', // 그리드 모드용 스타일
    side: 'mt-6', // 사이드바 모드용 스타일
  }

  const containerStyles = {
    grid: '',
    side: 'hidden laptop:block',
  }

  if (cotentListIsLoading) {
    return <LoadingSkeleton />
  }

  if (contentListIsError) {
    return (
      <ErrorAlert
        error={contentListError?.message || '데이터를 불러오는데 실패했습니다'}
      />
    )
  }

  if (!contentData || contentData.length === 0) {
    return (
      <EmptyState
        title="컨텐츠가 없습니다"
        description="표시할 컨텐츠가 없습니다."
      />
    )
  }

  return (
    <div className={containerStyles[styleType]}>
      <section className={layoutStyles[styleType]}>
        {contentData.map((item: NewsArticleCard | EventContentCard) =>
          eventType === 'news' ? (
            <NewsCard article={item as NewsArticleCard} key={item.id} />
          ) : (
            <EventCard eventData={item as EventContentCard} key={item.id} />
          ),
        )}
      </section>
      <div className={paginationStyles[styleType]}>
        <ContentsPagination
          currentPage={currentPage}
          totalPage={totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default ContentList
