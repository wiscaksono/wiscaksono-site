import Link from 'next/link'
import { allArticles } from 'contentlayer/generated'

import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/atoms/card'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { FadeInStagger, FadeIn, AnimatePresence } from '@/components/atoms/fade-in'
import { generateSEO } from '@/lib/generateSEO'
import { ENV } from '@/lib/constants'

type SearchParamsProps = {
  searchParams: {
    tag: string
  }
}

const title = 'articles'
const description =
  "Embark on a journey through a diverse collection of articles, ranging from React deep-dives to engaging non-technical discussions. Whether you're exploring the entire repository or seeking insights on a specific tag, our articles cover a spectrum of topics to cater to both technical enthusiasts and those looking for non-technical perspectives. Discover thought-provoking content and immerse yourself in the world of insights and ideas."
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/articles`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata = generateSEO(title, description, image, url)

export default function Articles({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams
  let filteredArticles = tag ? allArticles.filter(articles => articles.tag.includes(tag)) : allArticles

  return (
    <FadeInStagger className='grid md:grid-cols-2 gap-5 p-5' faster>
      <AnimatePresence mode='wait'>
        {filteredArticles.map(articles => (
          <FadeIn layout key={articles.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Card className='h-max hover:shadow-lg hover:shadow-secondary'>
              <CardHeader className='p-5'>
                <CardTitle>
                  <Link href={`/articles/${articles.slug.toLowerCase()}`} className='leading-normal'>
                    {articles.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='py-0 px-5 text-sm text-muted-foreground line-clamp-4'>{articles.summary}</CardContent>
              <CardFooter className='p-5'>
                <div className='space-y-1'>
                  <p className='text-xs text-muted-foreground hidden md:block'>{articles.publishedDate}</p>
                  <div className='flex items-center gap-x-1'>
                    <p className='text-sm text-muted-foreground'>Tags: </p>
                    <Badge>{articles.tag}</Badge>
                  </div>
                </div>
                <Button variant='outline' className='ml-auto' asChild>
                  <Link href={`/articles/${articles.slug.toLowerCase()}`} className='leading-normal'>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </AnimatePresence>
    </FadeInStagger>
  )
}
