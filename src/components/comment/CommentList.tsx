import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import ReportModal from '../modal/ReportModal'
import IcMoreIcon from '@/assets/icon_more.svg'
import CommentInput from './CommentInput'
import { ContentType } from './CommentSection'

const CommentList = ({
  eventDetail,
  refetchEventDetail,
  contentType,
}: {
  eventDetail: any
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  const [replyListRepresents, setReplyListRepresents] = useState<{
    [key: string]: boolean
  }>({})

  const toggleReplyList = (commentId: string) => {
    setReplyListRepresents((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }
  if (eventDetail?.commentList?.length === 0)
    return <p className="text-sm text-textLight">아직 남겨진 댓글이 없어요!</p>
  return eventDetail?.commentList?.map((comment: any) => (
    <section className="p-4" key={comment.id}>
      <CommentItem
        isDeleted={comment.isDeleted}
        comment={comment}
        eventId={eventDetail?.id ?? ''}
        contentType={contentType}
        refetchEventDetail={refetchEventDetail}
      />
      <details
        className="mt-4 [&>summary]:list-none"
        open={replyListRepresents[comment.id]}
      >
        <summary
          onClick={(e) => {
            e.preventDefault()
            toggleReplyList(comment.id)
          }}
          className={`cursor-pointer hover:underline ${replyListRepresents[comment.id] ? 'text-gray-900' : 'text-green'}`}
        >
          {`답글${replyListRepresents[comment.id] ? '보기' : '달기'}(${comment.replies.length})`}
        </summary>
        <div className="ml-10 mt-4 flex flex-col gap-1">
          {comment.replies.length > 0 &&
            comment.replies.map((reply: any) => (
              <CommentItem
                isDeleted={reply.isDeleted}
                key={reply.id}
                comment={reply}
                eventId={eventDetail?.id ?? ''}
                contentType={contentType}
                refetchEventDetail={refetchEventDetail}
              />
            ))}
          <CommentInput
            eventId={eventDetail?.id ?? ''}
            refetchEventDetail={refetchEventDetail}
            commentId={comment.id}
            contentType={contentType}
          />
        </div>
      </details>
    </section>
  ))
}

export default CommentList

const CommentItem = ({
  isDeleted,
  comment,
  eventId,
  contentType,
  refetchEventDetail,
}: {
  isDeleted: boolean
  comment: any
  eventId: string
  contentType: ContentType
  refetchEventDetail: () => void
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const { user } = useAuthStore() // 로그인한 유저 정보 가져오기

  const isAuthor = comment.authorId === user?.userId

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const handleEditClick = () => {
    if (!isAuthor) return
    setIsEditing(true)
    setIsDropdownOpen(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditedContent(comment.content) // 원래 내용으로 복구
  }

  const handleReportSubmit = async (reason: string) => {
    try {
      const response = await fetch(`/api/report?commentId=${comment.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      })


      if (response.status === 302) {
        window.location.href = `${window.location.pathname}?auth=login`
        return response.json()
      }

      if (!response.ok) {
        throw new Error('신고에 실패했습니다.')
      }
      alert('신고가 접수되었습니다.')
      setIsReportModalOpen(false)
    } catch (error) {
      console.error('신고 오류:', error)
      alert(
        '신고가 정상적으로 접수되지 않았습니다. \n문제가 반복해서 발생할 경우 관리자에게 문의해주세요.',
      )
    }
  }

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `/api/comments?contentType=${contentType}&eventId=${eventId}&commentId=${comment.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: editedContent }),
        },
      )

      if (response.status === 302) {
        window.location.href = `${window.location.pathname}?auth=login`
        return response.json()
      }
      if (!response.ok) {
        throw new Error('댓글 수정에 실패했습니다.')
      }

      setIsEditing(false)
      refetchEventDetail()
    } catch (error) {
      console.error('댓글 수정 오류:', error)
    }
  }

  const handleDeleteComment = async () => {
    try {
      if (!isAuthor) return
      const response = await fetch(
        `/api/comments?contentType=${contentType}&eventId=${eventId}&commentId=${comment.id}`,
        {
          method: 'DELETE',
        },
      )

      if (response.status === 302) {
        window.location.href = `${window.location.pathname}?auth=login`
        return response.json()
      }
      if (response.status === 204) {
        refetchEventDetail()
        return
      }
      const errorData = await response.json()
      throw new Error(errorData.error || '댓글 삭제에 실패했습니다.')
    } catch (error) {
      console.error('댓글 삭제 오류:', error)
    }
  }

  return (
    <>
      <section className="flex items-center justify-between gap-2 p-2">
        <section className="flex items-center gap-2">
          <Image
            src={comment?.authorImageUrl ?? '/default_avatar.svg'}
            alt="profile"
            width={24}
            height={24}
          />
          <p className="text-xl">{comment?.authorName}</p>
        </section>
        {!isEditing && !isDeleted && (
          <div className="relative">
            <button onClick={toggleDropdown}>
              <IcMoreIcon />
            </button>
            {isDropdownOpen && (
              <div className="absolute w-[60px] rounded border bg-white shadow-md">
                {isAuthor ? (
                  <>
                    <button
                      className="block placeholder:w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleEditClick}
                    >
                      수정
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleDeleteComment}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <button
                    className="flex-1 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsReportModalOpen(true)}
                  >
                    신고
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>
      {isEditing ? (
        <div className="flex gap-2 p-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full resize-none rounded-xl border p-2 text-sm"
            rows={3}
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={handleEditSubmit}
              className="rounded bg-green px-3 py-1 text-sm text-white hover:bg-green/90"
            >
              완료
            </button>
            <button
              onClick={handleEditCancel}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="p-2">{comment?.content}</p>
      )}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </>
  )
}
