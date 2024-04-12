import { LiaBookSolid } from 'react-icons/lia'
import { RiReactjsLine, RiArticleLine } from 'react-icons/ri'

import { getDefaultPanelConf } from '@/lib/actions'
import { ResizableWrapper, SidebarMenu } from '@/components/organisms/resizable-wrapper'

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  const { defaultSize, defaultCollapsed } = await getDefaultPanelConf()

  const sidebarMenu: SidebarMenu[] = [
    {
      title: 'All article',
      href: '/articles',
      icon: <RiArticleLine className='w-4 h-4 shrink-0' />
    },
    {
      title: 'React',
      href: '/articles?tag=React',
      icon: <RiReactjsLine className='w-4 h-4 shrink-0' />
    },
    {
      title: 'Non Technical',
      href: '/articles?tag=Non Technical',
      icon: <LiaBookSolid className='w-4 h-4 shrink-0' />
    }
  ]

  return (
    <ResizableWrapper defaultSize={defaultSize} defaultCollapsed={defaultCollapsed} sidebarTitle='Article Tags' sidebarMenu={sidebarMenu}>
      {children}
    </ResizableWrapper>
  )
}
