import { notFound, redirect } from 'next/navigation'

import { getContents } from '@/lib/contents'

export default function About() {
  const content = getContents('abouts')

  if (!content) notFound()

  return redirect(`/abouts/${content[0].slug}`)
}
