'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'

export const createPost = async (formData: FormData) => {
  const session = await auth()
  const desc = formData.get('desc') as string
  if (!session || !desc) return redirect('/guest-book')
  await db.post.create({ data: { desc: desc, userId: session.user.id } })
  revalidatePath('/guest-book')
  revalidateTag('posts')
}

export const deletePost = async (postID: number, userID: string) => {
  const result = await db.post.deleteMany({ where: { id: postID, userId: userID } })
  if (result.count === 0) return { error: 'Post not found or you do not have permission to delete it' }
  revalidatePath('/guest-book')
  revalidateTag('posts')
  return { success: true }
}

export const likePost = async (postID: number, userID: string) => {
  await db.like.create({ data: { userId: userID, postId: postID } })
  revalidatePath('/guest-book')
  revalidateTag('posts')
  return { success: true }
}

export const unlikePost = async (postID: number, userID: string) => {
  const result = await db.like.deleteMany({ where: { postId: postID, userId: userID } })
  if (result.count === 0) return { error: 'Like not found' }
  revalidatePath('/guest-book')
  revalidateTag('posts')
}
