export type MeetupDetailType = 'prev' | 'next'

// MeetupDetailSection의 props 타입 정의
export interface IMeetupDetailSectionProps {
  meetupDetail: IMeetupContentCard | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  // handleMeetupChange: (type: MeetupDetailType) => void
  // isNavigatingNext: boolean
  // isNavigatingPrev: boolean
  // refetchMeetupDetail: () => void
}

export interface ImeetupQueries {
  currentPage?: number
  pageSize?: number
  meetupId?: string
}
export interface IMeetupContentCard {
  id: number
  title: string
  content: string
  location: string
  region: string
  startDate: string
  endDate: string
  participantTarget: string
  supportDetails: string
  activityHours: string
  contactPerson: string
  contactNumber: string
  registrationLink: string
  imageUrl: string
  hits: number
  commentList: any[]
}

// 컨텐츠 배열 타입 정의
export interface IPloggingMeetupList {
  content: IMeetupContentCard[]
}

export interface IMeetupListResponse {
  totalPage: number
  totalElements: number
  ploggingMeetupSimpleResponseList: IMeetupContentCard[]
}
