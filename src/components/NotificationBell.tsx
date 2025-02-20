// components/NotificationBell.tsx
'use client'

import { createElement, useState } from 'react'
// import { useNotificationStore } from '@/store/notificationStore'
import { useNotificationSSE } from '@/hooks/useNotificationSSE'
import { Bell, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { IMessageMapType, INotification } from '@/types/INotification'
import { Button } from '@/components/ui/button'
import UnreadCommentAlarmIcon from '@/assets/icon_unreadComment.svg'
// import ReadCommentAlarmIcon from '@/assets/icon_readComment.svg'
// import CheckedIcon from '@/assets/icon_checked.svg'
import { useQuery } from '@tanstack/react-query'
// import Image from 'next/image'
import dayjs from 'dayjs'

export const fetchNotifications = async (): Promise<INotification[]> => {
  const response = await fetch('/api/notification')
  if (!response.ok) {
    throw new Error('Failed to fetch notifications')
  }
  return response.json()
}

export function NotificationBell() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  // const { markAsRead } = useNotificationStore()

  // useQuery에 제네릭 타입 지정
  const {
    data: notifications,
    isError,
    isLoading,
  } = useQuery<INotification[]>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 0, // 항상 새로운 데이터로 간주
    refetchInterval: 30000, // 30초마다 갱신
    refetchOnWindowFocus: true, // 윈도우 포커스시 새로운 데이터 요청
  })

  // 이제 filter 메소드 사용 시 타입 에러가 발생하지 않음
  // const unreadCount = notifications.filter((n) => !n.isRead).length
  // SSE 연결
  useNotificationSSE()

  const handleNotificationClick = (notification: INotification) => {
    // markAsRead(notification.id)
    if (notification.targetUrl) {
      router.push(notification.targetUrl)
    }
    setIsOpen(false)
  }

  const messageMap: IMessageMapType = {
    COMMENT: {
      comment: '댓글이 달렸습니다.',
      iconPath: UnreadCommentAlarmIcon,
    },
    REPLY: {
      comment: '댓글에 답글이 달렸습니다.',
      iconPath: UnreadCommentAlarmIcon,
    },
  }

  if (!notifications) {
    return null
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="relative cursor-pointer bg-white text-black">
          <Bell className="h-6 w-6" />
          {/* {unreadCount > 0 && (
            <span className="absolute -top-0 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span> */}
          {/* )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-4 w-[400px] border border-gray-200 p-0 shadow-lg animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2">
        <div className="max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-semibold">알림</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-solid"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              알림을 불러오는 중...
            </div>
          ) : isError ? (
            <div className="p-4 text-center text-red-500">
              알림을 불러오는데 실패했습니다.
            </div>
          ) : notifications?.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              새로운 알림이 없습니다
            </div>
          ) : (
            notifications?.map((notification: INotification) => (
              <div
                key={notification.id}
                className={`flex h-[80px] cursor-pointer items-center gap-4 border-b p-5 hover:bg-hoverGray ${!notification.isRead}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div>
                  {messageMap[notification.type].iconPath && (
                    <div>
                      {createElement(messageMap[notification.type].iconPath!, {
                        className: 'h-8 w-8',
                        color: notification.isRead ? '#808080' : '#1EE494',
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm">
                    {messageMap[notification.type]?.comment ||
                      '알 수 없는 알림입니다.'}
                  </p>
                  <p className="mt-1 text-xs text-textLight">
                    {dayjs(notification.createdAt).format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
