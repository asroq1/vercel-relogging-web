import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import ContentList from './ContentList'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { eventsList, eventsListIsLoading, eventListIsError } =
    useEventsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  // if (eventsListIsLoading) return <LoadingSkeleton />
  // if (evnetListError || !eventsList || eventListIsError) {
  //   return (
  //     <ErrorAlert
  //       error={evnetListError?.message || '데이터를 불러오는데 실패했습니다'}
  //     />
  //   )
  // }
  // if (eventsList.content.length === 0) {
  //   return (
  //     <EmptyState
  //       title="이벤트가 없습니다"
  //       description="현재 진행 중인 이벤트가 없습니다."
  //     />
  //   )
  // }
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
