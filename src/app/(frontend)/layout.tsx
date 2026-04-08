import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditingControls from '@/ui/VisualEditingControls'
import '@/styles/app.css'
import localFont from 'next/font/local'

const DejaVu = localFont({
  src: [
    {
      path: '../../fonts/DejaVuSansCondensed.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/DejaVuSansCondensed-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-base',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Root>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID} />}
      <body className={`${DejaVu.variable} font-base bg-canvas text-jet antialiased`}>
        <NuqsAdapter>
          <SkipToContent />
          <Header />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
          <VisualEditingControls />
        </NuqsAdapter>
      </body>
    </Root>
  )
}
