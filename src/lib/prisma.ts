import { PrismaClient } from '@prisma/client'

import { ENV } from './constants'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ENV.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = db
