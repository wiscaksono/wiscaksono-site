import { cache } from 'react'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { DefaultSession } from 'next-auth'

import { ENV } from './constants'
import { db } from './prisma'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut
} = NextAuth({
  secret: ENV.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: ENV.GITHUB_CLIENT_ID || '',
      clientSecret: ENV.GITHUB_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  pages: {
    error: '/'
  }
})

const auth = cache(uncachedAuth)

export { auth, handlers, signIn, signOut }
