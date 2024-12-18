import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import ContentList from '@/components/ContentList'
import { ErrorAlert } from '../status/ErrorAlert'
import { LoadingSkeleton } from '../status/LoadingSkeleton'
import { EmptyState } from '../status/EmptyStatus'
import { EventFilters } from '@/components/event/EventFilters'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const [region, setRegion] = useState('전체') // 지역 선택
  const [sortBy, setSortBy] = useState('START_DATE') // 정렬 선택
  const [progressStatus, setProgressStatus] = useState(false) // 진행중인 모임만 보기
  const pageSize = 15 // 페이지 당 아이템 수

  const { eventsList, eventsListIsLoading, eventListIsError, evnetListError } =
    useEventsQueries({ currentPage, pageSize, region, sortBy, progressStatus })

  const handlePageChange = async (newPage: number) => {
    console.log(newPage)
    if (newPage < 0) return
    if (eventsList?.totalPages && newPage >= eventsList.totalPages) return
    setCurrentPage(newPage)
  }

  if (eventsListIsLoading) return <LoadingSkeleton />
  if (evnetListError || !eventsList || eventListIsError) {
    return (
      <>
        <div className="mb-4 mt-4 flex justify-between gap-4 overflow-x-auto pb-2 pt-2">
          <EventFilters
            setRegion={setRegion}
            setSortBy={setSortBy}
            setProgressStatus={setProgressStatus}
            region={region}
            sortBy={sortBy}
            progressStatus={progressStatus}
          />
        </div>
        <ErrorAlert
          error={evnetListError?.message || '데이터를 불러오는데 실패했습니다'}
        />
      </>
    )
  }

  if (eventsList.content.length === 0) {
    return (
      <>
        <div className="mb-4 mt-4 flex justify-between gap-4 overflow-x-auto pb-2 pt-2">
          <EventFilters
            setRegion={setRegion}
            setSortBy={setSortBy}
            setProgressStatus={setProgressStatus}
            region={region}
            sortBy={sortBy}
            progressStatus={progressStatus}
          />
        </div>
        <EmptyState
          title="동네 플로깅이 없습니다"
          description="현재 우리 동네 플로깅이 없습니다."
        />
      </>
    )
  }

  return (
    <>
      <div className="mb-4 mt-4 flex justify-between gap-4 overflow-x-auto pb-2 pt-2">
        <EventFilters
          setRegion={setRegion}
          setSortBy={setSortBy}
          setProgressStatus={setProgressStatus}
          region={region}
          sortBy={sortBy}
          progressStatus={progressStatus}
        />
      </div>
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
