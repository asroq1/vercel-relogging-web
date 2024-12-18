'use client'

import ContentList from '@/components/ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function MeetupSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('index')) || 0
  const pathname = usePathname()
  const pageSize = 5 // 페이지 당 아이템 수

  const {
    //이벤트 페이지네이션
    meetupList,
    meetupListIsError,
    meetupListIsLoading,
  } = useMeetupQueries({
    currentPage,
    pageSize,
  })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (meetupList?.totalPage && newPage >= meetupList.totalPage) return
    const params = new URLSearchParams()
    params.append('index', newPage.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  //

  return (
    <ContentList
      contentData={meetupList?.ploggingMeetupSimpleResponseList ?? []}
      totalPage={meetupList?.totalPage ?? 0}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      cotentListIsLoading={meetupListIsLoading}
      contentListIsError={meetupListIsError}
      eventType={'meetup'}
      styleType={'side'}
    />
  )
}
