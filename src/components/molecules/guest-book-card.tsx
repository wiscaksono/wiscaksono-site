import { Session } from 'next-auth/types'
import { Post, User } from '@prisma/client'
import { RemoveBtn } from '@/app/guest-book/action-buttons'

type GuestBookRowProps = {
  session: Session | null
  data: { user: User } & Post
}

export const GuestBookRow = ({ session, data }: GuestBookRowProps) => {
  return (
    <pre className='flex lg:flex-row flex-col items-start gap-x-2 py-2 lg:py-0 md:!text-sm text-xs'>
      <code className='text-muted-foreground lg:w-36 truncate shrink-0 flex items-center justify-between w-full gap-x-2'>
        {data.user.name}
        <code className='text-muted-foreground shrink-0 flex items-center justify-center gap-x-2 lg:hidden'>
          {session?.user?.id === data.user.id && <RemoveBtn id={data.id} />}
          <code>
            {data.createdAt
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
      <code className='flex-1 whitespace-pre-line'>{data.desc}</code>
      <code className='text-muted-foreground shrink-0 lg:flex hidden items-center justify-center gap-x-2'>
        {session?.user?.id === data.user.id && <RemoveBtn id={data.id} />}
        <code>
          {data.createdAt
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
  )
}
