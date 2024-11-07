'use cleint'

import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'

type OauthTypeProps = 'google' | 'kakao'

interface IOauthType {
  oauthType: OauthTypeProps
  className?: string
}

const OauthButton = ({ oauthType, className }: IOauthType) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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

  // const handleLogin = () => {
  //   signIn(provider, {
  //     callbackUrl: '/oauth/success',
  //   })
  // }
  const onOauthLoginHandler = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/${oauthType}`
  }
  return (
    <>
      <button
        onClick={onOauthLoginHandler}
        className={`flex w-full items-center justify-center gap-2 rounded-md bg-background p-3 shadow-md hover:shadow-lg active:translate-y-0.5 active:shadow-sm desktop:max-h-[48px] ${className}`}
      >
        {providerConfig[oauthType].icon}
        <span className="text-sm">{providerConfig[oauthType].text}</span>
      </button>
    </>
  )
}

export default OauthButton
