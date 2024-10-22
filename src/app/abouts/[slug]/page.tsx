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
  let project = getContents('abouts').find(post => post.slug === slug)
  if (!project) return

  let { summary: description, image } = project.metadata
  const title = slug.charAt(0).toUpperCase() + slug.slice(1)
  let ogImage = image ? `${ENV.NEXT_PUBLIC_WEBSITE_URL}${image}` : `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${ENV.NEXT_PUBLIC_WEBSITE_URL}/abouts/${project.slug}`,
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
  const projects = getContents('abouts')
  return projects.map(project => ({ slug: project.slug }))
}

export default async function AboutPage({ params }: Props) {
  const { slug } = await params
  const project = getContents('abouts').find(project => project.slug === slug)
  if (!project) notFound()

  return (
    <MDXRenderer
      limitWidth={false}
      source={project.content}
      components={{
        pre: props => <pre className='bg-transparent p-0' {...props} />
      }}
    />
  )
}
