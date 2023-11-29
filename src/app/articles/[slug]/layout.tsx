import { allArticles } from 'contentlayer/generated'
import { RiReactjsLine } from 'react-icons/ri'
import { LiaBookSolid } from 'react-icons/lia'
import { Suspense } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'

import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'
import { slugify } from '@/lib/slug'

async function getContent(params: { slug: string }) {
  const article = allArticles.find(article => article.slug.toLowerCase() === params.slug)
  if (!article) null
  return article
}

export default async function ArticleDetailLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const content = await getContent(params)
  if (!content) return null

  return (
    <section className='grid grid-cols-12 overflow-hidden h-full'>
      <aside className='md:col-span-3 lg:col-span-2 border-r border-lines md:block hidden overflow-y-auto'>
        <Accordion type='single' collapsible defaultValue='table-of-contents'>
          <AccordionItem value='table-of-contents'>
            <AccordionTrigger className='border-b border-lines px-5 py-2.5 text-left'>Table of content</AccordionTrigger>
            <AccordionContent className='mt-5 space-y-1'>
              <FadeInStagger faster>
                {content.headings.map((heading: { text: string; level: string }, i: number) => (
                  <FadeIn key={i}>
                    <Suspense fallback={<>Loading...</>}>
                      <AsideLink
                        href={'#' + slugify(heading.text)}
                        startWith={`/projects/${params.slug}`}
                        title={heading.text}
                        data-level={heading.level}
                        className='text-xs data-[level=three]:pl-8'
                      >
                        {heading.text}
                      </AsideLink>
                    </Suspense>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[83vh] md:h-auto'>{children}</section>
    </section>
  )
}
