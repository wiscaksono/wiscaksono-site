import { Suspense } from 'react'

import { Nav } from './_components/nav'
import { getContents } from '@/lib/contents'

import { Menu } from './_components/nav'

interface Props {
  children: React.ReactNode
}

export default function AboutLayout({ children }: Readonly<Props>) {
  const contents = getContents('abouts')
  const menu: Menu[] = contents.map(content => ({
    title: content.metadata.title,
    href: `/abouts/${content.slug}`
  }))

  return (
    <>
      <Suspense fallback={<div className='sticky top-0 h-5 z-50 mb-2 flex select-none items-center overflow-x-auto bg-[#232323]' />}>
        <Nav menu={menu} />
      </Suspense>
      <article className='prose max-w-none overflow-hidden'>{children}</article>
    </>
  )
}
