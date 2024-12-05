import OauthButton from '@/components/OauthButton'

function GoogleOauthButton() {
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/google`

  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    }).toString()

  return <OauthButton oauthType="google" authUrl={googleAuthUrl} />
}

export default GoogleOauthButton
