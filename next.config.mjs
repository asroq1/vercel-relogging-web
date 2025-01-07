/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    dirs: ['src'], // ESLint 검사 디렉토리 지정
    ignoreDuringBuilds: false, // 빌드 중 ESLint 오류 무시하지 않음
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript 오류 무시하지 않음
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  images: {
    domains: [
      'loremflickr.com',
      'cdn.hkbs.co.kr',
      'cdn.esgeconomy.com',
      'www.gravatar.com',
      'relogging.s3.ap-northeast-2.amazonaws.com',
      'www.1365.go.kr',
    ], // 허용할 도메인 목록을 지정
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname:
          '/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/',
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  // openAnalyzer: true // default!
})(nextConfig)
