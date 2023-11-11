import './globals.css'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'

import { ThemeWrapper } from '@/components/atoms/theme-wrapper'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'
import { ENV } from '@/lib/constants'

const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'Wiscaksono',
    template: '%s | Wiscaksono'
  },
  description:
    "I'm a passionate Front End Developer with a background in Electrical Engineering. With expertise in React.js and Next.js, I transform design masterpieces into flawless code. My skills in TailwindCSS ensure visually stunning and responsive websites. Get ready to witness the magic as I bring high-quality work to make the internet a brighter and funnier place!",
  openGraph: {
    title: 'Wiscaksono',
    description:
      "I'm a passionate Front End Developer with a background in Electrical Engineering. With expertise in React.js and Next.js, I transform design masterpieces into flawless code. My skills in TailwindCSS ensure visually stunning and responsive websites. Get ready to witness the magic as I bring high-quality work to make the internet a brighter and funnier place!",
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
    title: 'Wisnu Wicaksono',
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
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeWrapper>
      </body>
    </html>
  )
}
