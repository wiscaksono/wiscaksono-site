import { z } from 'astro:schema';
import { ActionError, defineAction } from 'astro:actions';
import { getSession } from 'auth-astro/server';
import { db } from '@/prisma';

async function getUserIdFromSession(request: Request) {
  const session = await getSession(request);
  if (!session || !session.user || !session.user.id) {
    throw new ActionError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }
  return session.user.id;
}

export const server = {
  createPost: defineAction({
    accept: 'form',
    input: z.object({ message: z.string() }),
    handler: async ({ message }, { request }) => {
      const userId = await getUserIdFromSession(request);

      await db.post.create({
        data: { desc: message, userId: userId },
      });
    },
  }),
  deletePost: defineAction({
    accept: 'form',
    input: z.object({ postID: z.number() }),
    handler: async ({ postID }) => {
      await db.post.delete({ where: { id: postID } });
    },
  }),
  likeUnlikePost: defineAction({
    accept: 'form',
    input: z.object({ postID: z.number() }),
    handler: async ({ postID }, { request }) => {
      const userId = await getUserIdFromSession(request);
      const like = await db.like.findFirst({
        where: { postId: postID, userId: userId },
      });

      if (like) {
        await db.like.delete({ where: { id: like.id } });
      } else {
        await db.like.create({
          data: {
            postId: postID,
            userId: userId,
          },
        });
      }
    },
  }),
};
