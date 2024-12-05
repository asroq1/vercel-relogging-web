export interface OAuthRequest {
  socialType: 'GOOGLE' | 'KAKAO'
  authCode: string
  redirectUri: string
}

export interface UserResponse {
  name: string
  email: string
}

export interface OAuthResponse {
  accessToken: string
  userResponse: UserResponse
}
