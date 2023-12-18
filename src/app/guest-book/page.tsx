import { Input } from '@/components/atoms/input'
import { FadeIn } from '@/components/atoms/fade-in'
import { SignInBtn, SendBtn, RemoveBtn } from './action-buttons'

import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { createPost } from '@/lib/actions'

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
    <FadeIn className='p-5 space-y-2'>
      <form action={createPost} className='col-span-full flex items-center justify-between gap-x-2.5'>
        <div className='flex-1 relative'>
          <Input name='desc' id='desc' placeholder='This is really cool!' aria-labelledby='desc' />
        </div>
        {!session ? <SignInBtn /> : <SendBtn />}
      </form>

      <article className='divide-y lg:divide-y-0'>
        {posts.map((item, i) => (
          <pre className='flex lg:flex-row flex-col items-start gap-x-2 py-2 lg:py-0 md:!text-sm text-xs' key={i}>
            <code className='text-muted-foreground lg:w-36 truncate shrink-0 flex items-center justify-between w-full gap-x-2'>
              {item.user.name}
              <code className='text-muted-foreground shrink-0 flex items-center justify-center gap-x-2 lg:hidden'>
                {session?.user?.id === item.user.id && <RemoveBtn id={item.id} />}
                <code>
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
                </code>
              </code>
            </code>
            <code className='hidden lg:block'>:</code>
            <code className='flex-1 whitespace-pre-line'>{item.desc}</code>
            <code className='text-muted-foreground shrink-0 lg:flex hidden items-center justify-center gap-x-2'>
              {session?.user?.id === item.user.id && <RemoveBtn id={item.id} />}
              <code>
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
              </code>
            </code>
          </pre>
        ))}
      </article>
    </FadeIn>
  )
}
