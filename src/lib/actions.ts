'use server'
import { revalidatePath } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'
import * as Wakatime from '@/types/wakatimeResponse'

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

export const weeklyCodingActivity = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/e9b713d4-e19b-4fd2-8c7b-437e9688057a.json')
  return res.json() as Promise<Wakatime.WeeklyCodingActivity>
}

export const weeklyCodingLanguanges = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/bcd5d5b7-4aa6-48cb-83ee-4de7b6815f2d.json')
  return res.json() as Promise<Wakatime.WeeklyCodingLanguanges>
}

export const weeklyCodeEditor = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/298a9b88-69ae-49ed-9572-602035f1af30.json')
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}

export const weeklyOperatingSystems = async () => {
  const res = await fetch('https://wakatime.com/share/@Wiscaksono/5aff6824-e4f8-45ba-b949-7f08d14bf047.json')
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}
