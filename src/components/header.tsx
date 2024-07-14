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
      <div className='absolute space-x-2'>
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Close' onClick={handleClose} />
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Minimize' onClick={handleMinimize} />
        <button className='h-3 w-3 rounded-full bg-[#898989]' aria-label='Maximize' onClick={handleFullscreen} />
      </div>
      <p className='mx-auto select-none font-semibold not-sr-only'>iTerm</p>
      <LennyFace />
    </header>
  )
}
