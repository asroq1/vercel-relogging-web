import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface INewsQueries {
  currentPage?: number
  pageSize?: number
  articleId?: string
}

async function fetchNewsArticle(articleId: string) {
  if (!articleId) {
    throw new Error('articleId is required')
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${articleId}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchNewsLists = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/list?page=${page}&pageSize=${pageSize}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const useNewsQueries = ({
  currentPage,
  pageSize,
  articleId,
}: INewsQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const newsListQuery = useQuery({
    queryKey: ['newsArticles', currentPage, pageSize],
    queryFn: () => fetchNewsLists(currentPage ?? 0, pageSize ?? 15),
    staleTime: 5 * 60 * 1000, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    gcTime: 30 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (30분)
  })

  const newsDetailQuery = useQuery({
    queryKey: ['newsDetail', articleId],
    queryFn: () => fetchNewsArticle(articleId ?? ''),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    gcTime: 30 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (30분)
  })

  // 이전/다음 이벤트 네비게이션
  const navigationMutation = useMutation({
    mutationFn: async ({
      type,
      currentId,
    }: {
      type: 'prev' | 'next' | 'side'
      currentId: string
    }) => {
      let response = null
      if (type === 'side') {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${currentId}`,
        )
      }
      if (type === 'prev' || type === 'next') {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsArticles/${currentId}/${type}`,
        )
      }
      const data = await response?.json()
      if (!response?.ok)
        throw {
          ...data,
          type,
        }

      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      // 새로운 데이터를 캐시에 저장
      queryClient.setQueryData(['newsDetail', data.id], data)

      queryClient.invalidateQueries({
        queryKey: ['newsDetail'],
      })

      return { data, type }
    },
    onSuccess: (news) => {
      // URL 업데이트
      console.log('뉴스', news.data.id)
      router.push(`/news/${news.data.id}`)
    },
  })

  return {
    // 뉴스 리스트
    newsList: newsListQuery.data,
    newsListIsLoading: newsListQuery.isLoading,
    newsListIsError: newsListQuery.isError,
    newsListError: newsListQuery.error,

    // 뉴스 디테일
    newsDetail: newsDetailQuery.data,
    newsDetailIsLoading: newsDetailQuery.isLoading,
    newsDetailIsError: newsDetailQuery.isError,
    newsDetailError: newsDetailQuery.error,

    // 이전/다음 이벤트 네비게이션
    navigate: navigationMutation.mutate,
    isNavigating: navigationMutation.isPending,
    isNavigatingPrev:
      navigationMutation.isPending &&
      navigationMutation.variables?.type === 'prev',
    isNavigatingNext:
      navigationMutation.isPending &&
      navigationMutation.variables?.type === 'next',
  }
}
