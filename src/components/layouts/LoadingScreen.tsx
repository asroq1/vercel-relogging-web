import Image from 'next/image'

export default function OAuthSuccessPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Image
            src="/loading.gif"
            alt="로딩 중"
            width={80}
            height={80}
            priority
          />
        </div>
        <p className="mt-2 font-bold text-textStrong">잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}
