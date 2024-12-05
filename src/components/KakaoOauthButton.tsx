import OauthButton from '@/components/OauthButton'

function KakaoOauthButton() {
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/kakao`

  console.log('redirectUri', redirectUri)
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`

  return <OauthButton oauthType="kakao" authUrl={kakaoAuthUrl} />
}

export default KakaoOauthButton
