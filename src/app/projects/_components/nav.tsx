'use client'
import { Link } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'

import { getFileIcon } from '@/components/icons'

export const Nav = () => {
  const params = useSearchParams()

  return (
    <nav className='sticky top-0 z-50 mb-2 flex select-none items-center overflow-x-auto bg-[#232323]'>
      {menu.map(item => {
        const isActive = params.get('tag')?.toLowerCase() === item.title || (!params.get('tag') && item.title === 'all-projects')
        return (
          <Link
            key={item.title}
            href={item.href}
            className={`flex shrink-0 items-center gap-1.5 px-3 py-0.5 leading-none transition-all ${isActive ? 'bg-[#969696] text-black' : 'text-[#BDBDBDE6]'}`}
          >
            {getFileIcon(item.title)}
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

const menu = [
  {
    title: 'all-projects',
    href: '/projects'
  },
  {
    title: 'react',
    href: '/projects?tag=React'
  },
  {
    title: 'react-native',
    href: '/projects?tag=React-Native'
  },
  {
    title: 'next',
    href: '/projects?tag=Next'
  },
  {
    title: 'html',
    href: '/projects?tag=HTML'
  }
]
