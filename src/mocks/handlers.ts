/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'

// 단일 뉴스 아티클 생성 함수
const createNewsArticle = () => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence({ min: 5, max: 10 }),
  content: faker.lorem.paragraphs(3),
  aiSummary: faker.lorem.paragraphs(2),
  source: faker.company.name(),
  author: faker.person.fullName(),
  publishedAt: faker.date.recent({ days: 30 }).toISOString(),
  hits: faker.number.int({ min: 100, max: 10000 }),
  imageCaption: faker.lorem.sentence(),
  imagePath: faker.image.url({ width: 640, height: 480 }),
})

export const handlers = [
  http.all('*', async () => {
    await delay(100)
  }),

  http.get('/api/newsArticles/list', async ({ request }) => {
    //  TODO: 5초 대기 지우기
    // await delay(3000)

    console.log('request', request)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '9')

    // 페이지네이션 로직 구현
    const totalElements = 100 // 전체 아이템 수
    const totalPages = Math.ceil(totalElements / pageSize)

    const start = page * pageSize
    const end = Math.min(start + pageSize, totalElements)

    const newsArticles = Array.from({ length: end - start }, () => ({
      id: faker.number.int({ min: 1, max: 1000 }),
      title: faker.lorem.sentence(),
      aiSummary: faker.lorem.paragraph(),
      publishedAt: faker.date.recent().toISOString().split('T')[0],
      imagePath: 'https://picsum.photos/id/10/400/300',
    }))

    return HttpResponse.json({
      totalPage: totalPages,
      totalElements: totalElements,
      newsArticleSimpleResponseList: newsArticles,
    })
  }),

  http.get('/api/newsArticles/:id', ({ params }) => {
    const article = createNewsArticle()
    article.id = parseInt(params.id as string)

    return HttpResponse.json(article)
  }),

  http.get('/api/newsArticles/:id/next', ({ params }) => {
    const article = createNewsArticle()
    article.id = parseInt(params.id as string)

    return HttpResponse.json(article)
  }),

  http.get('/api/newsArticles/:id/prev', () => {
    const article = createNewsArticle()
    article.id = faker.number.int({ min: 1, max: 1000 })

    return HttpResponse.json(article)
  }),

  http.get('/api/ploggingEvents/:id/next', ({ params }) => {
    const article = createPloggingEventDetail(parseInt(params.id as string))
    article.id = faker.number.int({ min: 1, max: 1000 })

    return HttpResponse.json(article)
  }),

  http.get('/api/ploggingEvents/:id/prev', ({ params }) => {
    const article = createPloggingEventDetail(parseInt(params.id as string))
    article.id = faker.number.int({ min: 1, max: 1000 })

    return HttpResponse.json(article)
  }),

  // 지자체 행사 mock logic
  http.get('/api/ploggingEvents/list', async ({ request }) => {
    //  TODO: 5초 대기 지우기
    // await delay(3000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const size = parseInt(url.searchParams.get('size') || '10')

    const totalElements = 100 // 전체 아이템 수
    const totalPages = Math.ceil(totalElements / size)
    const currentElements =
      page === totalPages - 1 ? totalElements % size : size

    // 현재 페이지에 해당하는 이벤트 목록 생성
    const content = Array.from({ length: currentElements }, createPloggingEvent)

    return HttpResponse.json({
      totalPages,
      totalElements,
      size,
      content,
      number: page,
      sort: createSort(),
      numberOfElements: content.length,
      pageable: createPageable(page, size),
      first: page === 0,
      last: page === totalPages - 1,
      empty: content.length === 0,
    })
  }),

  // 플로깅 이벤트 상세 조회
  http.get('/api/ploggingEvents/:id', ({ params }) => {
    const eventId = parseInt(params.id as string)
    const eventDetail = createPloggingEventDetail(eventId)

    return HttpResponse.json(eventDetail)
  }),

  // 플로깅 밋업 mock logic
  http.get('/api/ploggingMeetups/list', async ({ request }) => {
    //  TODO: 5초 대기 지우기
    console.log('프론트 요청', request)
    // await delay(3000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const size = parseInt(url.searchParams.get('size') || '10')

    const totalElements = 100 // 전체 아이템 수
    const totalPages = Math.ceil(totalElements / size)
    const currentElements =
      page === totalPages - 1 ? totalElements % size : size

    // 현재 페이지에 해당하는 이벤트 목록 생성
    const content = Array.from({ length: currentElements }, createPloggingEvent)

    return HttpResponse.json({
      totalPages,
      totalElements,
      size,
      content,
      number: page,
      sort: createSort(),
      numberOfElements: content.length,
      pageable: createPageable(page, size),
      first: page === 0,
      last: page === totalPages - 1,
      empty: content.length === 0,
    })
  }),
  // 플로깅 이벤트 상세 조회
  http.get('/api/ploggingMeetups/:id', ({ params }) => {
    const eventId = parseInt(params.id as string)
    const eventDetail = createPloggingEventDetail(eventId)

    return HttpResponse.json(eventDetail)
  }),
]

// 지자체 행사 mock logic

// 이미지 객체 생성 함수
const createImage = () => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  url: faker.image.url({ width: 640, height: 480 }),
  caption: faker.lorem.sentence(),
  orderIndex: faker.number.int({ min: 0, max: 10 }),
})

// 단일 플로깅 이벤트 생성 함수
const createPloggingEvent = () => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  title: faker.lorem.sentence(),
  location: faker.location.streetAddress(),
  region: faker.location.city(),
  hits: faker.number.int({ min: 0, max: 1000 }),
  image: createImage(),
  startDate: faker.date.future().toISOString(),
  endDate: faker.date.future().toISOString(),
})

// 정렬 객체 생성 함수
const createSort = () => ({
  empty: faker.datatype.boolean(),
  sorted: faker.datatype.boolean(),
  unsorted: faker.datatype.boolean(),
})

// 페이지 정보 객체 생성 함수
const createPageable = (pageNumber: number, pageSize: number) => ({
  offset: pageNumber * pageSize,
  sort: createSort(),
  paged: true,
  pageNumber: pageNumber,
  pageSize: pageSize,
  unpaged: false,
})

// 플로깅 이벤트 상세 정보 생성 함수
const createPloggingEventDetail = (id: number) => {
  // 이미지 리스트 생성 (3-5개의 랜덤한 이미지)
  const imageCount = faker.number.int({ min: 3, max: 5 })
  const imageList = Array.from({ length: imageCount }, (_) => createImage())

  // 시작일과 종료일 생성 (시작일이 종료일보다 앞에 오도록)
  const startDate = faker.date.future()
  const endDate = faker.date.between({
    from: startDate,
    to: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 최대 7일 후
  })

  return {
    id,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    location: faker.location.streetAddress(),
    region: faker.location.city(),
    hits: faker.number.int({ min: 0, max: 1000 }),
    organizerName: faker.company.name(),
    managerName: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    participationTarget: faker.helpers.arrayElement([
      '전체',
      '청소년',
      '성인',
      '가족',
      '시니어',
    ]),
    volunteerScore: faker.helpers.arrayElement([
      '2시간',
      '3시간',
      '4시간',
      '5시간',
    ]),
    imageList,
  }
}
