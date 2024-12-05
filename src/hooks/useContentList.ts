import { IEventContentCard } from '@/types/IEvent'
import { NewsArticleCard } from '@/types/INews'
import { useQuery } from '@tanstack/react-query'
import { fetchNewsLists } from './useNewsQueries'
import { fetchEventsArticle } from './useEventsQueries'

interface UseContentListParams {
  contentType: 'news' | 'events'
  currentPage: number
  pageSize: number
}

interface UseContentListReturn<T> {
  data: T[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  totalPages: number
}

// 컨텐츠 타입별 fetching 로직 분리
const fetchStrategies = {
  news: async ({
    currentPage,
    pageSize,
  }: Omit<UseContentListParams, 'contentType'>) => {
    // 뉴스 데이터 fetching 로직
    return fetchNewsLists(currentPage, pageSize)
  },
  events: async ({
    currentPage,
    pageSize,
  }: Omit<UseContentListParams, 'contentType'>) => {
    // 이벤트 데이터 fetching 로직
    return fetchEventsArticle(currentPage, pageSize)
  },
}

export function useContentList<T extends NewsArticleCard | IEventContentCard>({
  contentType,
  currentPage,
  pageSize,
}: UseContentListParams): UseContentListReturn<T> {
  const queryResult = useQuery({
    queryKey: [contentType, currentPage],
    queryFn: () => fetchStrategies[contentType]({ currentPage, pageSize }),
  })

  return {
    data: queryResult.data?.data || [],
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    totalPages: queryResult.data?.totalPages || 0,
  }
}
