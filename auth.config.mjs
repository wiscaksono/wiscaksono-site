import GitHub from '@auth/core/providers/github';

import { defineConfig } from 'auth-astro';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/prisma';

export default defineConfig({
  adapter: PrismaAdapter(db),
  secret: import.meta.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    error: '/',
  },
});
