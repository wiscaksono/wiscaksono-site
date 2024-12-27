import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRenderer } from '@/components/mdx-renderer'

import { ENV } from '@/lib/constants'
import { getContents } from '@/lib/contents'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  const { slug } = await params
  let articles = getContents('articles').find(post => post.slug.toLowerCase() === slug.toLowerCase())
  if (!articles) return

  let { title, summary: description, image } = articles.metadata
  let ogImage = image ? `${ENV.NEXT_PUBLIC_WEBSITE_URL}${image}` : `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${ENV.NEXT_PUBLIC_WEBSITE_URL}/articles/${articles.slug.toLowerCase()}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

export async function generateStaticParams() {
  const articles = getContents('articles')
  return articles.map(article => ({ slug: article.slug.toLowerCase() }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getContents('articles').find(article => article.slug.toLowerCase() === slug.toLowerCase())
  if (!article) notFound()

  return <MDXRenderer source={article.content} />
}
