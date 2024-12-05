'use cleint'

import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'
import Link from 'next/link'

type OauthTypeProps = 'google' | 'kakao'

interface IOauthType {
  oauthType: OauthTypeProps
  className?: string
  authUrl: string
}

const OauthButton = ({ oauthType, className, authUrl }: IOauthType) => {
  const providerConfig = {
    google: {
      icon: <GoogleIcon />,
      text: '구글 계정으로 로그인',
    },
    kakao: {
      icon: <KakaoIcon />,
      text: '카카오 계정으로 로그인',
    },
  }

  return (
    <>
      <Link
        href={authUrl}
        className={`hover:bg-hoverGray flex w-full max-w-[400px] items-center justify-center gap-2 rounded-md bg-background p-3 active:translate-y-0.5 active:shadow-sm laptop:max-h-[48px] ${className}`}
      >
        {providerConfig[oauthType].icon}
        <span className="text-sm font-normal">
          {providerConfig[oauthType].text}
        </span>
      </Link>
    </>
  )
}

export default OauthButton
