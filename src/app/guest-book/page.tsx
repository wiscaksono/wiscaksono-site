import { db } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

const getPosts = unstable_cache(
  () => {
    return db.post.findMany({
      include: { user: true, like: { select: { user: { select: { id: true } } } }, _count: { select: { like: true } } },
      orderBy: { createdAt: 'desc' }
    })
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
)

export default async function GuestBook() {
  const posts = await getPosts()

  return (
    <>
      <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0'>
        {posts.map(item => (
          <li key={item.id} className='flex flex-col gap-1 py-1 lg:flex-row lg:gap-2 lg:border-y-0 lg:py-0 group'>
            <p className='flex-1 truncate lg:w-36 lg:flex-none'>
              <span className='text-[#5de4c7]'>~</span>/{item.user.name.toLowerCase().replace(/\s/g, '-')}
            </p>
            <p className='block lg:hidden'>{item.desc}</p>
            <p className='hidden lg:block'>:</p>
            <p className='hidden flex-1 lg:block'>{item.desc}</p>
            <p className='hidden lg:block'>
              {new Date(item.createdAt)
                .toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })
                .replace(',', '')
                .replace(/\//g, '-')}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
