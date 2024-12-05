export interface IEventsQueries {
  currentPage?: number
  pageSize?: number
  eventId?: string
}

export type EventDetailType = 'prev' | 'next'

export interface IEventDetailSectionProps {
  eventDetail: IEventContentCard | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  onChangeEventDetail: (type: EventDetailType) => void
  isNavigatingNext: boolean
  isNavigatingPrev: boolean
}

export interface IEventContentCarouselProps {
  imageList: IEventContentCardImage[]
}

export interface IEventContentCardImage {
  id: number
  url?: string | null
  caption?: string
  orderIndex?: number
}

export interface IEventImageType {
  id: number
  url: string
  caption: string
  orderIndex: number
}

// 개별 플로깅 이벤트 타입 정의
export interface IEventContentCard {
  id: string
  title?: string
  location?: string
  region?: string
  hits?: number
  imageList: IEventImageType[]
  image?: IEventImageType
  startDate?: string
  endDate?: string
  caption?: string
  managerName?: string
  phoneNumber?: string
  content?: string
  status?: number | undefined
  message?: string | undefined
  url?: string | undefined
}

export interface IPageable {
  pageNumber: number
  pageSize: number
  sort: ISort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ISort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface IPloggingEventContentList {
  content: IEventContentCard[]
  pageable: IPageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: ISort
  numberOfElements: number
  first: boolean
  empty: boolean
}
