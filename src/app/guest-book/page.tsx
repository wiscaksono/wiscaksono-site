import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { createPost } from '@/lib/actions'

import { SignIn, Delete, Submit, Like } from './_components/buttons'

export default async function GuestBook() {
  const [posts, session] = await Promise.all([
    db.post.findMany({ include: { user: true, like: { select: { user: { select: { id: true } } } }, _count: { select: { like: true } } }, orderBy: { createdAt: 'desc' } }),
    auth()
  ])

  return (
    <>
      <form className='mb-2 flex flex-col gap-2 text-sm lg:flex-row lg:items-center' action={createPost} key={+new Date()}>
        <p className='truncate lg:w-36'>
          <span className='text-[#5de4c7]'>~</span>/{session ? session?.user?.name?.toLowerCase().replace(/\s/g, '-') : 'guest'}
        </p>
        <p className='hidden lg:block'>:</p>
        <input
          name='desc'
          id='desc'
          type='text'
          className='flex-1 bg-transparent placeholder-opacity-50 caret-[#5de4c7] placeholder:text-[#898989]/90 focus:border-transparent focus:outline-none focus:ring-0'
          placeholder={session ? 'Leave a message' : 'Sign in to leave a message'}
          autoFocus
          required
          minLength={3}
          maxLength={140}
          autoComplete='off'
          disabled={!session}
        />
        {session ? <Submit /> : <SignIn />}
      </form>
      <ul className='flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0'>
        {posts.map(item => (
          <li key={item.id} className='flex flex-col gap-1 py-1 lg:flex-row lg:gap-2 lg:border-y-0 lg:py-0 group'>
            <p className='flex-1 truncate lg:w-36 lg:flex-none'>
              <span className='text-[#5de4c7]'>~</span>/{item.user.name.toLowerCase().replace(/\s/g, '-')}
            </p>
            <p className='block lg:hidden'>{item.desc}</p>
            <p className='hidden lg:block'>:</p>
            <p className='hidden flex-1 lg:block'>{item.desc}</p>
            {session && (
              <div className='flex items-start mt-1 gap-x-1'>
                {<Like postID={item.id} userID={session.user.id} likeCount={item._count.like} likedBy={item.like.map(like => like.user.id)} />}
                {item.user.id === session?.user.id && <Delete postID={item.id} userID={session.user.id} />}
              </div>
            )}
            <p className='hidden lg:block'>
              {item.createdAt
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
