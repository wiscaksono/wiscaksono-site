import { notFound, permanentRedirect } from 'next/navigation'

import { getContents } from '@/lib/contents'

export default function About() {
  const content = getContents('abouts')

  if (!content) notFound()

  return permanentRedirect(`/abouts/${content[0].slug}`)
}
