import { notFound } from 'next/navigation'
import { allArticles } from 'contentlayer/generated'

import { MDXComponent } from '@/components/molecules/mdx-component'
import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'

type ParamsProps = {
  slug: string
}

async function getContent(params: ParamsProps) {
  const article = allArticles.find(article => article.slug.toLowerCase() === params.slug)
  if (!article) null
  return article
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const about = await getContent(params)
  if (!about) return {}

  const title = about.title
  const description = about.summary
  const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
    ...generateSEO(title, description, image, `/projects/${title}`)
  }
}

export async function generateStaticParams() {
  return allArticles.map(article => ({
    slug: article.slug.toLowerCase()
  }))
}

export default async function ArticleDetail({ params }: { params: ParamsProps }) {
  const content = await getContent(params)
  if (!content) return notFound()

  return (
    <MDXComponent
      code={content.body.code}
      transparentBg={false}
      className={
        '!p-5 prose-code:p-2 font-sans prose-figcaption:text-center prose-img:first-of-type:mt-0 prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-li:text-muted-foreground prose-img:mx-auto prose-img:w-full prose-img:md:w-2/3  prose-strong:text-foreground prose-h4:text-foreground prose-a:no-underline'
      }
    />
  )
}
