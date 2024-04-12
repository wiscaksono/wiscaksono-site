import { SiTypescript } from 'react-icons/si'
import { allAbouts } from 'contentlayer/generated'

import { getDefaultPanelConf } from '@/lib/actions'
import { ResizableWrapper, SidebarMenu } from '@/components/organisms/resizable-wrapper'

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const { defaultSize, defaultCollapsed } = await getDefaultPanelConf()

  const sidebarMenu: SidebarMenu[] = allAbouts.map(about => ({
    title: about.title,
    href: `/about/${about.slug}`,
    icon: <SiTypescript className='w-4 h-4 shrink-0' />
  }))

  return (
    <ResizableWrapper defaultSize={defaultSize} defaultCollapsed={defaultCollapsed} sidebarTitle='About Me' sidebarMenu={sidebarMenu}>
      {children}
    </ResizableWrapper>
  )
}
