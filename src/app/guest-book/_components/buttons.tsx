'use client'
import { useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'

import { deletePost, likePost, unlikePost } from '@/lib/actions'
import { GitHub, Loading, Close, Heart } from '@/components/icons'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SignIn = (props: Props) => {
  return (
    <button
      type='button'
      onClick={() => signIn('github')}
      className='flex lg:w-[160px] w-full items-center justify-center gap-2 bg-[#898989] px-2 py-0.5 text-[#131313]'
      {...props}
    >
      <GitHub />
      SignIn
    </button>
  )
}

export const Delete = ({ postID, userID, ...props }: Props & { postID: number; userID: string }) => {
  const [pending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deletePost(postID, userID)
    })
  }

  return (
    <button onClick={handleDelete} aria-label='Delete' disabled={pending || props.disabled} {...props}>
      {pending ? <Loading className='animate-spin' /> : <Close />}
    </button>
  )
}

export const Submit = (props: Props) => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={`flex w-full items-center justify-center gap-2 gap-x-2 bg-[#898989] px-2 py-0.5 text-[#131313] lg:w-[160px] ${pending ? 'cursor-not-allowed' : ''} ${props.className ? props.className : ''}`}
      disabled={pending || props.disabled}
      {...props}
    >
      {pending ? 'Loading...' : 'Submit'}
    </button>
  )
}

export const Like = ({ postID, userID, likeCount, likedBy, ...props }: Props & { postID: number; userID: string; likeCount: number; likedBy: string[] }) => {
  const [pending, startTransition] = useTransition()
  const isLiked = likedBy.includes(userID)

  const handleLike = () => {
    startTransition(async () => {
      if (isLiked) {
        await unlikePost(postID, userID)
      } else {
        await likePost(postID, userID)
      }
    })
  }

  return (
    <button
      onClick={handleLike}
      aria-label='Delete'
      disabled={pending || props.disabled}
      className={`flex items-center gap-x-1 group-hover:opacity-100 lg:opacity-0 opacity-100 transition-opacity ${pending ? 'cursor-not-allowed !opacity-100' : ''} ${props.className ? props.className : ''} `}
      {...props}
    >
      <span className='leading-none text-xs'>{likeCount}</span>{' '}
      {pending ? <Loading className='animate-spin' /> : <Heart className={`stroke-[#898989]/90 ${isLiked ? 'fill-[#898989]' : ''}`} />}
    </button>
  )
}
