import { Suspense } from 'react'

import { Nav, Menu } from './_components/nav'

interface Props {
  children: React.ReactNode
}

export default function CodingActivityLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Suspense fallback={<div className='mb-2 h-5 bg-[#232323]' />}>
        <Nav menu={menu} />
      </Suspense>
      {children}
    </>
  )
}

const menu: Menu[] = [
  {
    title: 'languages',
    href: '/coding-activity'
  },
  {
    title: 'activity',
    href: '/coding-activity/activity'
  },
  {
    title: 'editor',
    href: '/coding-activity/editor'
  },
  {
    title: 'operating-systems',
    href: '/coding-activity/operating-systems'
  }
]
