import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRenderer } from '@/components/mdx-renderer'

import { ENV } from '@/lib/constants'
import { getContents } from '@/lib/contents'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  let project = getContents('articles').find(post => post.slug.toLowerCase() === params.slug.toLowerCase())
  if (!project) return

  let { title, summary: description, image } = project.metadata
  let ogImage = image ? `${ENV.NEXT_PUBLIC_WEBSITE_URL}${image}` : `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${ENV.NEXT_PUBLIC_WEBSITE_URL}/articles/${project.slug.toLowerCase()}`,
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
  const projects = getContents('projects')
  return projects.map(project => ({ slug: project.slug.toLowerCase() }))
}

export default function ArticlePage({ params }: Props) {
  const project = getContents('articles').find(project => project.slug.toLowerCase() === params.slug.toLowerCase())
  if (!project) notFound()

  return <MDXRenderer source={project.content} />
}
