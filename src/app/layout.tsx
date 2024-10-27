import './globals.css'
import { Metadata } from 'next'
import Script from 'next/script'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { ViewTransitions } from 'next-view-transitions'

import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { ResponsiveIndicator } from '@/components/responsive-indicator'

import { ENV } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'Wiscaksono',
    template: '%s | Wiscaksono'
  },
  description:
    "Get to know me, Wisnu Wicaksono, through this website! I'm a passionate frontend developer and electrical engineering student, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
  openGraph: {
    title: 'Wiscaksono',
    description:
      "Get to know me, Wisnu Wicaksono, through this website! I'm a passionate frontend developer and electrical engineering student, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
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

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body className={`${GeistSans.variable} ${GeistMono.variable} grid h-dvh place-items-center bg-[#3D3D3D] font-mono overflow-hidden`}>
          <Container>
            <section className='relative flex-1 overflow-y-auto px-2 md:px-3 lg:px-4'>{children}</section>
            <Navbar />
          </Container>
          <ResponsiveIndicator />
          <div className='fixed h-[300%] w-[300%] bg-grain-noise opacity-5 animate-grain pointer-events-none top-0' aria-hidden='true' />
          <div className='grid-pattern absolute left-0 top-0 h-full w-full' />
          {process.env.NODE_ENV === 'production' && <Script defer src='https://umami.wiscaksono.com/script.js' data-website-id='1f3b0505-7366-47bd-8757-95ad25395088' />}
        </body>
      </html>
    </ViewTransitions>
  )
}
