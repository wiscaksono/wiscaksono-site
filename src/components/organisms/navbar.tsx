import Link from 'next/link'
import { SiTypescript } from 'react-icons/si'
import { FaMarkdown } from 'react-icons/fa'
import { RiReactjsLine, RiHtml5Fill } from 'react-icons/ri'
import { TbBrandNextjs } from 'react-icons/tb'
import { HiTerminal } from 'react-icons/hi'
import { FaRegEnvelope } from 'react-icons/fa'
import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { TbBrandUpwork } from 'react-icons/tb'

import { NavLink } from '@/components/atoms/nav-link'
import { ThemeToggle } from '@/components/molecules/theme-toggler'

import { NavbarMobileBtn } from './navbar-mobile'

export const Navbar = () => {
  return (
    <nav className='md:grid grid-cols-12 border-b flex items-center justify-between relative z-10 bg-background'>
      <Link href='/' className='md:border-r md:px-5 px-2.5 py-4 text-foreground md:col-span-3 lg:col-span-2 shrink-0 transition-colors'>
        Wiscaksono
      </Link>
      <div className='md:col-span-9 lg:col-span-10 flex items-center justify-between'>
        <ul className='md:flex items-center divide-x w-max border-r hidden shrink-0'>
          {navMenu.map((menu, i) => (
            <NavLink key={i} href={menu.path}>
              {menu.name}
            </NavLink>
          ))}
        </ul>
        <ThemeToggle />
        <NavbarMobileBtn />
      </div>
    </nav>
  )
}

export const navMenu = [
  {
    name: '_hello',
    path: '/'
  },
  {
    name: '_about-me',
    path: '/about',
    child: [
      {
        name: 'personal.ts',
        path: '/about/personal.ts',
        icon: <SiTypescript className='w-4 h-4 shrink-0' />
      },
      {
        name: 'work.ts',
        path: '/about/work',
        icon: <SiTypescript className='w-4 h-4 shrink-0' />
      },
      {
        name: 'gear.md',
        path: '/about/gear',
        icon: <FaMarkdown className='w-4 h-4 shrink-0' />
      }
    ]
  },
  {
    name: '_projects',
    path: '/projects',
    child: [
      {
        name: 'All Projects',
        path: '/projects',
        icon: <HiTerminal className='w-4 h-4' />
      },
      {
        name: 'React',
        path: '/projects?tag=react',
        icon: <RiReactjsLine className='w-4 h-4' />
      },
      {
        name: 'Next',
        path: '/projects?tag=next',
        icon: <TbBrandNextjs className='w-4 h-4' />
      },
      {
        name: 'HTML',
        path: '/projects?tag=html',
        icon: <RiHtml5Fill className='w-4 h-4' />
      }
    ]
  },
  {
    name: '_guest-book',
    path: '/guest-book',
    child: [
      {
        name: 'Email',
        path: 'mailto:wwicaksono96@gmail.com',
        icon: <FaRegEnvelope className='w-4 h-4' />
      },
      {
        name: 'Upwork',
        path: 'https://www.upwork.com/freelancers/~01df34d78e05fa69bf',
        icon: <TbBrandUpwork className='w-4 h-4' />
      },
      {
        name: 'WhatsApp',
        path: 'https://wa.me/+6287885002327',
        icon: <BsWhatsapp className='w-4 h-4' />
      },
      {
        name: 'LinkedIn',
        path: 'https://www.linkedin.com/in/wiscaksono/',
        icon: <BsLinkedin className='w-4 h-4' />
      },
      {
        name: 'Instagram',
        path: 'https://www.instagram.com/amachoker/',
        icon: <BsInstagram className='w-4 h-4' />
      }
    ]
  }
]
