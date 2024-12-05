import { useState } from 'react'
import { useNewsQueries } from '@/hooks/useNewsQueries'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import { ErrorAlert } from './status/ErrorAlert'
import { EmptyState } from './status/EmptyStatus'
import ContentList from '@/components/ContentList'

export default function NewsListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { newsList, newsListError, newsListIsError, newsListIsLoading } =
    useNewsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (newsList?.totalPage && newPage >= newsList.totalPage) return
    setCurrentPage(newPage)
  }

  if (newsListIsLoading) return <LoadingSkeleton />
  if (newsListError || !newsList || newsListIsError) {
    return (
      <ErrorAlert
        error={newsListError?.message || '데이터를 불러오는데 실패했습니다'}
      />
    )
  }
  if (newsList.length === 0) {
    return (
      <EmptyState
        title="뉴스가 없습니다"
        description="현재 게시된 뉴스가 없습니다."
      />
    )
  }

  return (
    <>
      <ContentList
        contentData={newsList?.newsArticleSimpleResponseList}
        totalPage={newsList?.totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={newsListIsLoading}
        contentListIsError={newsListIsError}
        eventType={'news'}
        styleType={'grid'}
      />
    </>
  )
}
