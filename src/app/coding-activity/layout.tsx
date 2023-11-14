import { Suspense } from 'react'
import { Metadata } from 'next'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'
import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'
import { ENV } from '@/lib/constants'

import { allActivity } from './allActivities'

const title = 'coding-activity'
const description = 'coding-activity'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/coding-activity`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/og?title=${title}`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: {
      url: image
    }
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: [image]
  }
}

const data = [
  {
    title: 'Coding Activity',
    list: [...allActivity]
  }
]

export default function CodingActivityLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='grid grid-cols-12 overflow-hidden h-full'>
      <aside className='col-span-2 border-r border-lines md:block hidden'>
        <Accordion type='single' collapsible defaultValue='item-0'>
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className='border-b border-lines px-5 py-2.5' data-umami-event='Coding activity accordion'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='mt-5 space-y-1'>
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink href={`/coding-activity/${listItem.slug}`} startWith='/coding-activity' title={listItem.slug} data-umami-event={`Coding ${listItem.title} link`}>
                          <listItem.icon />
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
      <section className='md:col-span-10 col-span-12 overflow-y-auto relative h-[84vh] md:h-auto p-5'>{children}</section>
    </section>
  )
}
