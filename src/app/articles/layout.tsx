'use client'
import { RiReactjsLine, RiArticleLine } from 'react-icons/ri'
import { LiaBookSolid } from 'react-icons/lia'
import { Suspense } from 'react'
import { useParams } from 'next/navigation'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'

import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  if (params.slug) return children

  return (
    <section className='grid grid-cols-12 overflow-hidden h-full'>
      <aside className='md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto'>
        <Accordion type='single' collapsible defaultValue='item-0'>
          {TAGS.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className='border-b border-lines px-5 py-2.5 text-left' data-umami-event='accordion-articles'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='mt-5 space-y-1'>
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink href={listItem.href} startWith='/projects' title={listItem.title}>
                          <listItem.icon className='w-4 h-4' />
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
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto'>{children}</section>
    </section>
  )
}

const TAGS = [
  {
    title: 'Article Tags',
    list: [
      {
        title: 'All article',
        href: '/articles',
        icon: RiArticleLine
      },
      {
        title: 'React',
        href: '/articles?tag=React',
        icon: RiReactjsLine
      },
      {
        title: 'Non Technical',
        href: '/articles?tag=Non Technical',
        icon: LiaBookSolid
      }
    ]
  }
]
