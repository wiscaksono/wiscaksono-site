'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const Navbar = () => {
  const segment = useSelectedLayoutSegment()

  return (
    <nav className='select-none overflow-x-auto text-sm md:text-base lg:px-4 lg:py-3'>
      <div className='items-center justify-between gap-2 px-2 lg:px-0 hidden lg:flex'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-1.5 bg-[#969696]' />
          <a className='flex items-center' href='https://github.com/wiscaksono/wiscaksono-site' target='_blank' rel='norreferrer'>
            <svg
              className='mr-1 h-3 w-3'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='6' x2='6' y1='3' y2='15' />
              <circle cx='18' cy='6' r='3' />
              <circle cx='6' cy='18' r='3' />
              <path d='M18 9a9 9 0 0 1-9 9' />
            </svg>
            main
          </a>
        </div>
        <div className='flex items-center gap-x-2 not-sr-only'>
          <p>-- VIEW --</p>
        </div>
      </div>
      <div className='flex items-center justify-between gap-20 overflow-x-auto px-2 py-3 leading-none lg:px-0 lg:py-0'>
        <ul className='flex items-center'>
          <li className='mr-1 bg-[#969696] px-2 py-0.5 leading-none text-black not-sr-only'>tmux</li>
          {menu.map(item => {
            const isActived = segment === item.href.split('/')[1] || (segment === null && item.href === '/')
            return (
              <li key={item.title} className='shrink-0'>
                <Link href={item.href} className={`flex items-center gap-1.5 px-2 py-0.5 leading-none transition-all ${isActived && 'bg-[#969696] text-black'}`}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className='lg:flex hidden items-center gap-2 not-sr-only'>
          <p className='shrink-0 bg-[#969696] px-2 py-0.5 leading-none text-black'>Macbook-Pro-M3</p>
        </div>
      </div>
    </nav>
  )
}

const menu = [
  {
    title: 'home',
    href: '/'
  },
  {
    title: 'abouts',
    href: '/abouts/personal'
  },
  {
    title: 'projects',
    href: '/projects'
  },
  {
    title: 'guest-book',
    href: '/guest-book'
  },
  {
    title: 'articles',
    href: '/articles'
  }
]
