import { notFound } from 'next/navigation'
import { allAbouts } from 'contentlayer/generated'

import { MDXComponent } from '@/components/molecules/mdx-component'
import { ENV } from '@/lib/constants'

type ParamsProps = {
  title: string
}

async function getContent(params: ParamsProps) {
  const post = allAbouts.find(post => post.title === params.title)
  if (!post) null
  return post
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const about = await getContent(params)

  if (!about) return {}

  const title = about.title
  const description = about.summary
  const ogImage = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${ENV.NEXT_PUBLIC_WEBSITE_URL}/projects/${title}`,
      images: {
        url: ogImage
      }
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }

  return {
    ...metadata
  }
}

export async function generateStaticParams() {
  return allAbouts.map(post => ({
    title: post.title.toLowerCase()
  }))
}

export default async function Page({ params }: { params: ParamsProps }) {
  const content = await getContent(params)
  if (!content) return notFound()

  return <MDXComponent code={content.body.code} />
}
