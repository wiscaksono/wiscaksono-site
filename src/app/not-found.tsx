import { Metadata } from 'next'
import { ENV } from '@/lib/constants'

const title = '404'
const description = 'Sorry, i couldn’t find the page you’re looking for.'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/404`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url
  },
  twitter: {
    title,
    description
  }
}

export default function NotFound() {
  return (
    <section className='h-dvh flex items-center justify-center flex-col'>
      <div className='relative text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl'>Page not found :(</h1>
        <p className='mt-6 text-base leading-7 text-off-white'>Sorry, i couldn’t find the page you’re looking for.</p>
        <div className='absolute w-full h-full bg-secondary blur-2xl top-0 left-0 -z-10 rounded-full' />
      </div>
    </section>
  )
}
