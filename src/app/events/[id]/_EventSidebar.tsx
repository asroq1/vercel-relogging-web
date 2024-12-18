'use client'

import ContentList from '@/components/ContentList'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function EventSidebar() {
  const router = useRouter()
  // const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('index')) || 0
  const pathname = usePathname()
  const pageSize = 5 // 페이지 당 아이템 수

  const {
    //이벤트 페이지네이션
    eventsList,
    eventListIsError,
    eventsListIsLoading,
  } = useEventsQueries({
    currentPage,
    pageSize,
  })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (eventsList?.totalPages && newPage >= eventsList.totalPages) return

    const params = new URLSearchParams()
    params.append('index', newPage.toString())
    router.replace(`${pathname}?${params.toString()}`)
    // setCurrentPage(newPage)
    // router.push(`${params.toString()}`)
  }

  return (
    <ContentList
      contentData={eventsList?.content ?? []}
      totalPage={eventsList?.totalPages ?? 0}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      cotentListIsLoading={eventsListIsLoading}
      contentListIsError={eventListIsError}
      eventType={'events'}
      styleType={'side'}
    />
  )
}
