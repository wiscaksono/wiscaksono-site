'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, unstable_cache } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'
import { ENV } from './constants'

import type * as Wakatime from '@/types/wakatime'
import type { UmamiStats } from '@/types/umami'

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

export const weeklyCodingActivity = unstable_cache(async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/27bef61d-5377-441a-b326-c868eb825328.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodingActivity>
}, ['wakatime-weekly-coding-activity'])

export const weeklyCodingLanguanges = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/bcd5d5b7-4aa6-48cb-83ee-4de7b6815f2d.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodingLanguanges>
}

export const weeklyCodeEditor = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/298a9b88-69ae-49ed-9572-602035f1af30.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}

export const weeklyOperatingSystems = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/5aff6824-e4f8-45ba-b949-7f08d14bf047.json', {
    cache: 'no-cache'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}

export const umamiStats = unstable_cache(async () => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const endAt = now.getTime()
  const url = `${ENV.UMAMI_URL}?startAt=${startOfDay}&endAt=${endAt}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-umami-share-token': ENV.UMAMI_SHARE_TOKEN
    },
    cache: 'no-store'
  })

  return res.json() as Promise<UmamiStats>
}, ['umami-stats'])
