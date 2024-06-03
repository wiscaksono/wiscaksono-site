'use client'
import { useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'

import { GitHub, Loading, Close } from '@/components/icons'
import { deletePost } from '@/lib/actions'

export const SignIn = () => {
  return (
    <button type='button' onClick={() => signIn('github')} className='flex w-[160px] items-center justify-center gap-2 bg-[#898989] px-2 py-0.5 text-[#131313]'>
      <GitHub />
      SignIn
    </button>
  )
}

export const Delete = ({ id }: { id: number }) => {
  const [pending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deletePost(id)
    })
  }

  return (
    <button onClick={handleDelete} aria-label='Delete'>
      {pending ? <Loading className='animate-spin' /> : <Close />}
    </button>
  )
}

export const Submit = () => {
  const { pending } = useFormStatus()

  return (
    <button type='submit' className='flex w-full items-center justify-center gap-2 gap-x-2 bg-[#898989] px-2 py-0.5 text-[#131313] lg:w-[160px]'>
      {pending ? 'Loading...' : 'Submit'}
    </button>
  )
}
