'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/atoms/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/atoms/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='border-l rounded-none h-14 w-14 hidden md:flex shrink-0' data-umami-event='theme-toggle'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          data-umami-event='theme-toggle-light'
          onClick={() => {
            confirm('Get ready for a dazzling experience! 🌟 \nAre you absolutely sure you want to switch to the light mode and unleash the flashbang? 💡💥') && setTheme('light')
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem data-umami-event='theme-toggle-dark' onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem data-umami-event='theme-toggle-system' onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
