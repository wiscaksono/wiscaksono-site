'use client'
import { forwardRef, HTMLAttributes } from 'react'

import { LennyFace } from './lenny-face'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  isFullscreen: boolean
  toggleFullscreen: () => void
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(({ isFullscreen, toggleFullscreen, ...props }, ref) => {
  return (
    <header
      className={`relative flex items-center justify-between px-4 py-3 cursor-default ${isFullscreen ? 'lg:cursor-pointer' : 'lg:cursor-grab lg:active:cursor-grabbing'}`}
      ref={ref}
      {...props}
    >
      <div className='absolute lg:flex items-center top-1/2 -translate-y-1/2 group hidden'>
        <button className='h-6 w-6 rounded-full grid place-items-center' onClick={() => window.close()} aria-label='Close'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#FF6057] transition-colors' />
        </button>
        <button className='h-6 w-6 rounded-full grid place-items-center' aria-label='Minimize'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#FEBC2D] transition-colors' />
        </button>
        <button className='h-6 w-6 rounded-full grid place-items-center' onClick={toggleFullscreen} aria-label='Maximize'>
          <div className='h-3 w-3 rounded-full bg-[#898989] group-hover:bg-[#2BC840] transition-colors' />
        </button>
      </div>
      <p className='mx-auto select-none font-semibold not-sr-only hidden lg:block'>Alacritty</p>
      <p className='mx-auto select-none font-semibold not-sr-only lg:hidden block'>Wiscaksono</p>
      <LennyFace />
    </header>
  )
})
