import { redirect } from 'next/navigation'

import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'
import { allActivity } from '../allActivities'

type ParamsProps = {
  slug: string
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const data = allActivity.find(component => component.slug === params.slug)
  if (!data) return {}

  const title = data.slug + ' | Wiscaksono'
  const description = data.desc
  const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title.split(' ')[0]}`

  return {
    ...generateSEO(title, description, image, `/coding-activity/${params.slug}`)
  }
}

export async function generateStaticParams() {
  return allActivity.map(component => ({
    slug: component.slug
  }))
}

export default async function ActivityDetails({ params }: { params: ParamsProps }) {
  const data = allActivity.find(component => component.slug === params.slug)

  if (!data) redirect('/coding-activity')

  return <data.component />
}
