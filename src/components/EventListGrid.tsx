import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import ContentList from './ContentList'
import { ErrorAlert } from './status/ErrorAlert'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import { EmptyState } from './status/EmptyStatus'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { eventsList, eventsListIsLoading, eventListIsError, evnetListError } =
    useEventsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    console.log(newPage)
    if (newPage < 0) return
    if (eventsList?.totalPages && newPage >= eventsList.totalPages) return
    setCurrentPage(newPage)
  }

  if (eventsListIsLoading) return <LoadingSkeleton />
  if (evnetListError || !eventsList || eventListIsError) {
    return (
      <ErrorAlert
        error={evnetListError?.message || '데이터를 불러오는데 실패했습니다'}
      />
    )
  }

  if (eventsList.content.length === 0) {
    return (
      <EmptyState
        title="동네 플로깅이 없습니다"
        description="현재 우리 동네 플로깅이 없습니다."
      />
    )
  }

  return (
    <>
      <ContentList
        contentData={eventsList?.content}
        totalPage={eventsList?.totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={eventsListIsLoading}
        contentListIsError={eventListIsError}
        eventType={'events'}
        styleType={'grid'}
      />
    </>
  )
}
