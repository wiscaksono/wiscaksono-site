'use server'
import { revalidatePath } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'

export const createPost = async (formData: FormData) => {
  const session = await auth()
  const desc = formData.get('desc') as string
  if (!session || !desc) return
  await db.post.create({
    data: {
      desc: desc,
      userId: session.user.id
    }
  })

  revalidatePath('/guest-book')
}

export const deletePost = async (id: number) => {
  await db.post.delete({
    where: {
      id: id
    }
  })

  revalidatePath('/guest-book')
}
