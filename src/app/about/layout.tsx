import { SiTypescript } from 'react-icons/si'
import { allAbouts } from 'contentlayer/generated'

import { ResizableWrapper, SidebarMenu } from '@/components/organisms/resizable-wrapper'

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const sidebarMenu: SidebarMenu[] = allAbouts.map(about => ({
    title: about.title,
    href: `/about/${about.slug}`,
    icon: <SiTypescript className='w-4 h-4 shrink-0' />
  }))

  return (
    <ResizableWrapper sidebarTitle='About Me' sidebarMenu={sidebarMenu}>
      {children}
    </ResizableWrapper>
  )
}
