'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import { LennyFace } from './lenny-face'

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFxck = searchParams.get('fxck')

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close this window?')) {
      window.close()
    } else {
      router.push(`${pathname}?fxck=true`)
    }
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      router.push(pathname)
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const handleMinimize = () => {
    if (isFxck) {
      router.push(pathname)
    } else {
      alert('Look at on the right')
      router.push(`${pathname}?fxck=true`)
    }
  }

  return (
    <header className='relative flex items-center justify-between px-4 py-3'>
      <div className='absolute flex items-center top-1/2 -translate-y-1/2 group'>
        <button className='h-6 w-6 rounded-full grid place-items-center' onClick={handleClose} aria-label='Close'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#FF6057] transition-colors' />
        </button>
        <button className='h-6 w-6 rounded-full grid place-items-center' onClick={handleMinimize} aria-label='Minimize'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#FEBC2D] transition-colors' />
        </button>
        <button className='h-6 w-6 rounded-full grid place-items-center' onClick={handleFullscreen} aria-label='Maximize'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#2BC840] transition-colors' />
        </button>
      </div>
      <p className='mx-auto select-none font-semibold not-sr-only hidden lg:block'>iTerm</p>
      <p className='mx-auto select-none font-semibold not-sr-only lg:hidden block'>Wiscaksono</p>
      <LennyFace />
    </header>
  )
}
