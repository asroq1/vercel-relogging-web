// TODO: 알림 관련 상태를 관리하는 store 추후 수정 예정
// // store/notificationStore.ts
// import { create } from 'zustand'
// import { INotification } from '@/types/INotification'

// interface NotificationStore {
//   notifications: INotification[] // 알림 목록
//   unreadCount: number // 읽지 않은 알림 개수
//   setNotifications: (notifications: INotification[]) => void // 알림 설정
//   addNotification: (notification: INotification) => void // 알림 추가
//   markAsRead: (id: string) => void // 알림 읽음 처리
//   clearAll: () => void // 모든 알림 삭제
// }

// // 더미 데이터
// const dummyNotifications: any[] = [
//   {
//     id: '1',
//     message: '새로운 플로깅 모임이 등록되었습니다: 한강 플로깅',
//     createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5분 전
//     isRead: false,
//     targetUrl: '/meetup/1',
//   },
//   {
//     id: '2',
//     message: '내 게시글에 새로운 댓글이 달렸습니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
//     isRead: false,
//     targetUrl: '/events/1',
//   },
//   {
//     id: '3',
//     message: '서울시 플로깅 이벤트가 시작됩니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1시간 전
//     isRead: true,
//     targetUrl: '/events/2',
//   },
//   {
//     id: '4',
//     message: '플로깅 모임 신청이 완료되었습니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
//     isRead: true,
//     targetUrl: '/meetup/2',
//   },
//   {
//     id: '5',
//     message: '새로운 환경 뉴스가 등록되었습니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 하루 전
//     isRead: true,
//     targetUrl: '/news/1',
//   },
//   {
//     id: '6',
//     message: '새로운 환경 뉴스가 등록되었습니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 하루 전
//     isRead: true,
//     targetUrl: '/news/1',
//   },
//   {
//     id: '7',
//     message: '새로운 환경 뉴스가 등록되었습니다',
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 하루 전
//     isRead: true,
//     targetUrl: '/news/1',
//   },
// ]

// // 알림 관련 스토어
// export const useNotificationStore = create<NotificationStore>((set) => ({
//   notifications: dummyNotifications,
//   unreadCount: dummyNotifications.filter((n) => !n.isRead).length,
//   // 알림 설정
//   setNotifications: (notifications: INotification[]) =>
//     set(() => ({
//       notifications,
//       unreadCount: notifications.filter((n) => !n.isRead).length,
//     })),
//   // 알림 추가
//   addNotification: (notification) =>
//     set((state) => ({
//       notifications: [notification, ...state.notifications],
//       unreadCount: state.unreadCount + 1,
//     })),

//   // 알림 읽음 처리
//   markAsRead: (id) =>
//     set((state) => ({
//       notifications: state.notifications.map((n) =>
//         n.id === id ? { ...n, isRead: true } : n,
//       ),
//       unreadCount: Math.max(0, state.unreadCount - 1),
//     })),

//   // 모든 알림 삭제
//   clearAll: () => set({ notifications: [], unreadCount: 0 }),
// }))
