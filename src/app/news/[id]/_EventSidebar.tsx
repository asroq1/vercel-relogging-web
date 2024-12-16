import ContentList from '@/components/ContentList'
import { useNewsQueries } from '@/hooks/useNewsQueries'
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
    newsList,
    newsListIsError,
    newsListIsLoading,
  } = useNewsQueries({
    currentPage,
    pageSize,
    // articleId: articleId ?? '',
  })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (newsList?.totalPage && newPage >= newsList.totalPage) return
    const params = new URLSearchParams()
    params.append('index', newPage.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  //

  return (
    <ContentList
      contentData={newsList?.newsArticleSimpleResponseList}
      totalPage={newsList?.totalPage}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      cotentListIsLoading={newsListIsLoading}
      contentListIsError={newsListIsError}
      eventType={'news'}
      styleType={'side'}
    />
  )
}
