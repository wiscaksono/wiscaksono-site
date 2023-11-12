import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer/generated'

import { MDXComponent } from '@/components/molecules/mdx-component'
import { ENV } from '@/lib/constants'

type ParamsProps = {
  title: string
}

export const dynamic = 'force-static'

async function getProjectFromParams(params: ParamsProps) {
  const post = allProjects.find(post => post.title.toLowerCase() === params.title)
  if (!post) null
  return post
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const project = await getProjectFromParams(params)

  if (!project) return {}

  const title = project.title + ' | Wiscaksono'
  const description = project.summary
  const ogImage = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
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
}

export default async function ProjectDetail({ params }: { params: ParamsProps }) {
  const about = await getProjectFromParams(params)
  if (!about) return notFound()

  return (
    <MDXComponent
      code={about.body.code}
      className={
        'prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-li:text-muted-foreground prose-img:w-2/3 prose-img:mx-auto'
      }
    />
  )
}
