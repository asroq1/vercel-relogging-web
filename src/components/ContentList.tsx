import { NewsArticleCard } from '@/types/INews'
import { ContentsPagination } from './ContentsPagination'
import NewsCard from './NewsCard'
import { EventCard } from './EventCard'
import { IEventContentCard } from '@/types/IEvent'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import { ErrorAlert } from './status/ErrorAlert'
import { EmptyState } from './status/EmptyStatus'
import { MeetupCard } from './MeetupCard'
import { IMeetupContentCard } from '@/types/IMeetup'

export type ContentType =
  | NewsArticleCard
  | IEventContentCard
  | IMeetupContentCard
export type EventType = 'news' | 'events' | 'meetup'
export type styletype = 'grid' | 'side'
interface IContentList {
  contentData: ContentType[]
  eventType: EventType
  styleType: styletype
  currentPage: number
  totalPage: number
  handlePageChange: (newPage: number) => void
  cotentListIsLoading?: boolean
  contentListIsError?: boolean
  contentListError?: Error
}

const contentTemplate = (
  item: ContentType,
  eventType: EventType,
  styleType: styletype,
  currentPage: number,
) => {
  switch (eventType) {
    case 'news':
      return (
        <NewsCard
          article={item as NewsArticleCard}
          key={item.id}
          styleType={styleType}
          currentPage={currentPage}
        />
      )
    case 'events':
      return (
        <EventCard
          eventData={item as IEventContentCard}
          styleType={styleType}
          currentPage={currentPage}
          key={item.id}
        />
      )
    case 'meetup':
      return (
        <MeetupCard
          meetupData={item as IMeetupContentCard}
          key={item.id}
          styleType={styleType}
          currentPage={currentPage}
        />
      )
    default:
      return null
  }
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
    return <LoadingSkeleton columns={1} rows={5} />
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
        {contentData.map((item) =>
          contentTemplate(item, eventType, styleType, currentPage),
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
