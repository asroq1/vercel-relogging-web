import { useEffect, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
// import { useNotificationStore } from '@/store/notificationStore'

export const useNotificationSSE = () => {
  // const { addNotification } = useNotificationStore()
  const [status, setStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('disconnected')

  useEffect(() => {
    let eventSource: EventSourcePolyfill | null = null

    const connectSSE = () => {
      try {
        setStatus('connecting')

        eventSource = new EventSourcePolyfill(`/api/sse/connect`, {
          withCredentials: true,
          headers: {
            Accept: 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        })

        eventSource.onopen = () => {
          setStatus('connected')
          console.log('SSE 연결 성공')
        }

        eventSource.onmessage = () => {
          try {
            // const notification = JSON.parse(event.data)
            // addNotification(notification)
          } catch (error) {
            console.error('알림 파싱 실패:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('SSE 에러:', error)
          setStatus('disconnected')
          eventSource?.close()

          // 재연결 시도
          setTimeout(connectSSE, 5000)
        }
      } catch (error) {
        console.error('SSE 연결 실패:', error)
        setStatus('disconnected')
      }
    }

    connectSSE()

    return () => {
      if (eventSource) {
        eventSource.close()
        setStatus('disconnected')
      }
    }
  }, [])

  return status
}
