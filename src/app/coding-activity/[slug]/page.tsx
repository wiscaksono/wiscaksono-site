import { redirect } from 'next/navigation'

import { ENV } from '@/lib/constants'
import { allActivity } from '../allActivities'

type ParamsProps = {
  slug: string
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const data = allActivity.find(component => component.slug === params.slug)

  if (!data) return {}

  const title = data.slug + ' | Wiscaksono'
  const description = `My ${data.slug}`
  const ogImage = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=My%20${data.slug}%20activity`

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

export default async function ActivityDetails({ params }: { params: ParamsProps }) {
  const data = allActivity.find(component => component.slug === params.slug)

  if (!data) redirect('/coding-activity')

  return <data.component />
}
