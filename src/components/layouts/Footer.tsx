import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="h-[240px] w-full bg-text p-10">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-around">
        <div className="flex h-4/5 flex-col items-end justify-center gap-8 laptop:flex-row laptop:justify-between">
          {/* 회사 정보 섹션 */}
          <div className="w-full">
            <Image
              src={'/logoFooter.png'}
              alt="하단 푸터 로고"
              width={82}
              height={82}
              style={{ width: '82px', height: '82px' }}
            />
          </div>

          {/* 빠른 링크 섹션 */}
          <div className="mx-auto flex flex-col items-center justify-center gap-4 laptop:mx-0">
            <div className="flex space-x-4 whitespace-nowrap text-sm text-white">
              <Link href="/terms">이용약관</Link>
              <div className="h-5 w-[2px] bg-white"></div>
              <Link href="/privacy">개인정보처리방침</Link>
              <div className="h-5 w-[2px] bg-white"></div>
              <Link href="/contact">서비스소개</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
