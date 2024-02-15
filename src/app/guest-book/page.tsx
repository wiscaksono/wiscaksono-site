import { GuestBookRow } from '@/components/molecules/guest-book-card'

import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export default async function GuestBooks() {
  const session = await auth()
  const posts = await db.post.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <article className='divide-y lg:divide-y-0'>
      {posts.map((data, i) => (
        <GuestBookRow session={session} data={data} key={i} />
      ))}
    </article>
  )
}
