'use client'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

import { getFileIcon } from '@/components/icons'

export interface Menu {
  title: string
  href: string
}

export const Nav = ({ menu }: { menu: Menu[] }) => {
  const pathname = usePathname()
  return (
    <nav className='sticky top-0 z-50 mb-2 flex select-none items-center overflow-x-auto bg-[#232323]'>
      {menu.map(item => (
        <Link
          key={item.title}
          href={item.href}
          className={`flex shrink-0 items-center gap-1.5 px-3 py-0.5 leading-none transition-all ${pathname === item.href ? 'bg-[#969696] text-black' : 'text-[#BDBDBDE6]'}`}
        >
          {getFileIcon(item.title)}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
