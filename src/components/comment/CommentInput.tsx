'use client'

import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ContentType } from './CommentSection'

const CommentInput = ({
  eventId,
  commentId,
  refetchEventDetail,
  contentType,
}: {
  eventId: string
  commentId?: string
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  const queryClient = useQueryClient()
  const [isFocus, setIsFocus] = useState(false)
  const [comment, setComment] = useState('')
  const isExceeded = comment.length >= 250

  const { mutate: createComment } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/comments?contentType=${contentType}&eventId=${eventId}${commentId ? `&commentId=${commentId}` : ''}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: comment }),
        },
      )
      refetchEventDetail()
      if (response.status === 302) {
        window.location.href = `${window.location.pathname}?auth=login`
        return response.json()
      }
      if (!response.ok) {
        throw new Error('Failed to create comment')
      }

      return response.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', eventId] })
      setComment('')
    },

    onError: () => {
      alert('댓글 작성에 실패했습니다.')
    },
  })

  const handleSubmit = () => {
    createComment()
  }

  return (
    <div
      tabIndex={0} // 포커스를 받을 수 있도록 tabIndex 추가
      className="outline-none" // 포커스 테두리 제거
      onFocusCapture={() => setIsFocus(true)}
      onBlurCapture={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setIsFocus(false)
      }}
    >
      <textarea
        placeholder="댓글을 입력하세요"
        className={`w-full resize-none rounded-xl border border-gray-300 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isFocus ? 'h-20 border-green' : 'h-12'}`}
        value={comment}
        onChange={(e) =>
          e.target.value.length <= 250 && setComment(e.target.value)
        }
      />
      {isFocus && (
        <section className="flex items-center justify-between gap-2">
          <p
            className={`transition-colors ${isExceeded ? 'text-red-500' : 'text-gray-500'}`}
          >
            {comment.length}/250
          </p>
          <button
            type="submit"
            className="mt-1 rounded-md bg-green px-6 py-2 text-white"
            onClick={handleSubmit}
          >
            등록
          </button>
        </section>
      )}
    </div>
  )
}

export default CommentInput
