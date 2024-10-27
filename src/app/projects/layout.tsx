import { Metadata } from 'next'
import { Suspense } from 'react'
import { Nav } from './_components/nav'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Discover the interactive brilliance of my projects, peruse my polished portfolio, and delve into a sneak peek of my formidable technical prowess. Uncover a world where innovation meets functionality, showcased through a meticulously crafted Next.js application. Elevate your digital experience with a seamless blend of creativity and technical finesse.'
}

interface Props {
  children: React.ReactNode
}

export default function ProjectsLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Suspense fallback={<div className='sticky top-0 h-5 z-50 mb-2 flex select-none items-center overflow-x-auto bg-[#232323]' />}>
        <Nav />
      </Suspense>
      {children}
    </>
  )
}
