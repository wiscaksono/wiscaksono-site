'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'

export const createPost = async (formData: FormData) => {
  const session = await auth()
  const desc = formData.get('desc') as string
  if (!session || !desc) return redirect('/guest-book')
  await db.post.create({ data: { desc: desc, userId: session.user.id } })
  revalidatePath('/guest-book')
}

export const deletePost = async (postID: number, userID: string) => {
  await db.$transaction(async prisma => {
    const user = await prisma.user.findUnique({ where: { id: userID } })
    if (!user) return redirect('/guest-book')

    await db.post.delete({ where: { id: postID } })
    revalidatePath('/guest-book')
  })
}

export const likePost = async (postID: number, userID: string) => {
  await db.$transaction(async prisma => {
    const user = await prisma.user.findUnique({ where: { id: userID } })
    if (!user) return redirect('/guest-book')

    await prisma.like.create({ data: { user: { connect: { id: userID } }, post: { connect: { id: postID } } } })
    revalidatePath('/guest-book')
  })
}

export const unlikePost = async (postID: number, userID: string) => {
  await db.$transaction(async prisma => {
    const user = await prisma.user.findUnique({ where: { id: userID } })
    if (!user) return redirect('/guest-book')

    await db.like.deleteMany({ where: { postId: postID, userId: userID } })
    revalidatePath('/guest-book')
  })
}
