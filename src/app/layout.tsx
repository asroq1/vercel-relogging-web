import type { Metadata } from 'next'
import CommonLayout from '@/components/layouts/CommonLayout'
import ReactQueryProviders from '@/utils/ReactQueryProvider'
import { MswComponent } from '@/components/msw.component'
import SessionWrapper from '@/components/SessionWrapper'

export const metadata: Metadata = {
  title: 'Re-logging',
  description: 'Re-logging',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CommonLayout>
      <SessionWrapper>
        <MswComponent />
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </SessionWrapper>
    </CommonLayout>
  )
}
