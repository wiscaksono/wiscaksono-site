import { Suspense } from 'react'
import { Metadata } from 'next'
import { RiReactjsLine, RiHtml5Fill } from 'react-icons/ri'
import { TbBrandNextjs } from 'react-icons/tb'
import { HiTerminal } from 'react-icons/hi'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'
import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'
import { ENV } from '@/lib/constants'

const data = [
  {
    title: 'Projects',
    list: [
      {
        title: 'All Projects',
        href: '/projects',
        icon: <HiTerminal className='w-4 h-4' />
      },
      {
        title: 'React',
        href: '/projects?tag=React',
        icon: <RiReactjsLine className='w-4 h-4' />
      },
      {
        title: 'React Native',
        href: '/projects?tag=React Native',
        icon: <RiReactjsLine className='w-4 h-4' />
      },
      {
        title: 'Next',
        href: '/projects?tag=Next',
        icon: <TbBrandNextjs className='w-4 h-4' />
      },
      {
        title: 'HTML',
        href: '/projects?tag=HTML',
        icon: <RiHtml5Fill className='w-4 h-4' />
      }
    ]
  }
]

const title = 'projects'
const description = 'All my projects, including React, React Native, Next, and HTML.'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/projects`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/og?title=${title}`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: {
      url
    }
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: [image]
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='grid grid-cols-12 overflow-hidden h-full'>
      <aside className='col-span-2 border-r border-lines md:block hidden'>
        <Accordion type='single' collapsible defaultValue='item-0'>
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className='border-b border-lines px-5 py-2.5' data-umami-event='Projects accordion'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='mt-5 space-y-1'>
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink href={listItem.href} startWith='/projects' title={listItem.title} data-umami-event={`Projects ${listItem.title} link`}>
                          {listItem.icon}
                          {listItem.title}
                        </AsideLink>
                      </Suspense>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className='md:col-span-10 col-span-12 overflow-y-auto relative h-[84vh] md:h-auto'>{children}</section>
    </section>
  )
}
