import './globals.css'
import { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { ThemeWrapper } from '@/components/atoms/theme-wrapper'
import { Navbar } from '@/components/organisms/navbar'
import { NavbarMobile, NavbarProvider } from '@/components/organisms/navbar-mobile'
import { Footer } from '@/components/organisms/footer'
import { ResponsiveIndicator } from '@/components/atoms/responsive-indicator'

import { ENV } from '@/lib/constants'

const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'Wiscaksono',
    template: '%s | Wiscaksono'
  },
  description: 'Wisnu Wicaksono personal website',
  openGraph: {
    title: 'Wiscaksono',
    description: 'Wisnu Wicaksono personal website',
    url: ENV.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'Wiscaksono',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Wiscaksono',
    card: 'summary_large_image'
  },
  verification: {
    google: ENV.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={firaCode.className}>
        <ThemeWrapper attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <main>
            <NavbarProvider>
              <Navbar />
              <NavbarMobile />
            </NavbarProvider>
            {children}
            <Footer />
          </main>
        </ThemeWrapper>
        <Analytics />
      </body>
      <ResponsiveIndicator />
    </html>
  )
}
