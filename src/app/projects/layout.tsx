import { HiTerminal } from 'react-icons/hi'
import { TbBrandNextjs } from 'react-icons/tb'
import { RiReactjsLine, RiHtml5Fill } from 'react-icons/ri'

import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'
import { ResizableWrapper, SidebarMenu } from '@/components/organisms/resizable-wrapper'

const title = 'projects'
const description =
  'Discover the interactive brilliance of my projects, peruse my polished portfolio, and delve into a sneak peek of my formidable technical prowess. Uncover a world where innovation meets functionality, showcased through a meticulously crafted Next.js application. Elevate your digital experience with a seamless blend of creativity and technical finesse.'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/projects`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata = generateSEO(title, description, image, url)

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const sidebarMenu: SidebarMenu[] = [
    {
      title: 'All Projects',
      href: '/projects',
      icon: <HiTerminal className='w-4 h-4 shrink-0' />
    },
    {
      title: 'React',
      href: '/projects?tag=React',
      icon: <RiReactjsLine className='w-4 h-4 shrink-0' />
    },
    {
      title: 'React Native',
      href: '/projects?tag=React Native',
      icon: <RiReactjsLine className='w-4 h-4 shrink-0' />
    },
    {
      title: 'Next',
      href: '/projects?tag=Next',
      icon: <TbBrandNextjs className='w-4 h-4 shrink-0' />
    },
    {
      title: 'HTML',
      href: '/projects?tag=HTML',
      icon: <RiHtml5Fill className='w-4 h-4 shrink-0' />
    }
  ]

  return (
    <ResizableWrapper sidebarTitle='Projects' sidebarMenu={sidebarMenu}>
      {children}
    </ResizableWrapper>
  )
}
