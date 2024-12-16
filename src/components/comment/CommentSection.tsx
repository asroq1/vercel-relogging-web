import Image from 'next/image'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export type ContentType = 'ploggingEvents' | 'ploggingMeetups'

const CommentSection = ({
  eventId,
  eventDetail,
  refetchEventDetail,
  contentType,
}: {
  eventId: string
  eventDetail: any
  refetchEventDetail: () => void
  contentType: ContentType
}) => {
  console.log('✅ event detailconut', eventDetail)
  return (
    <article>
      <h2 className="text-2xl font-semibold">댓글</h2>
      <div className="mt-2 flex items-center gap-2 p-2">
        <Image
          src={eventDetail?.user?.profileImage ?? '/default_avatar.svg'}
          alt="profile"
          width={24}
          height={24}
        />
        <p className="text-xl">{eventDetail?.user?.nickname}</p>
        <p className="text-green">본인</p>
      </div>
      <CommentInput
        eventId={eventId}
        refetchEventDetail={refetchEventDetail}
        contentType={contentType}
      />
      <div className="my-8 border border-gray-300" />
      <CommentList
        eventDetail={eventDetail}
        refetchEventDetail={refetchEventDetail}
        contentType={contentType}
      />
    </article>
  )
}

export default CommentSection