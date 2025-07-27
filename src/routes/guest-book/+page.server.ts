import { fail } from '@sveltejs/kit';
import { and, count, desc, eq, sql } from 'drizzle-orm';

import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

const getGuestBooksPrepared = db
	.select({
		id: table.guestBook.id,
		content: table.guestBook.content,
		userId: table.guestBook.userId,
		username: table.user.username,
		createdAt: table.guestBook.createdAt,
		likeCount: count(table.guestBookLike.userId).mapWith(Number),
		liked: sql<number>`count(case when ${table.guestBookLike.userId} = ${sql.placeholder('currentUserId')} then 1 end)`.mapWith((val) => val > 0)
	})
	.from(table.guestBook)
	.innerJoin(table.user, eq(table.guestBook.userId, table.user.id))
	.leftJoin(table.guestBookLike, eq(table.guestBookLike.guestBookId, table.guestBook.id))
	.groupBy(table.guestBook.id, table.user.username)
	.orderBy(desc(table.guestBook.createdAt))
	.prepare('get_guest_books');

export const load: PageServerLoad = async (event) => {
	const currentUserId = event.locals.user?.id ?? null;
	const guestBooks = await getGuestBooksPrepared.execute({ currentUserId });

	return { user: event.locals.user, guestBooks };
};

export const actions: Actions = {
	insert: async (event) => {
		if (!event.locals.user) return fail(401, { error: 'Unauthorized' });

		const formData = await event.request.formData();
		const content = formData.get('content') as string;
		if (!content || content.trim().length < 3 || content.length > 140) return fail(400, { content, error: 'Invalid content length' });

		try {
			const [newEntry] = await db.insert(table.guestBook).values({ content, userId: event.locals.user.id, createdAt: new Date() }).returning({
				id: table.guestBook.id,
				content: table.guestBook.content,
				userId: table.guestBook.userId,
				createdAt: table.guestBook.createdAt
			});

			const returnedEntry = { ...newEntry, username: event.locals.user.username, liked: false, likeCount: 0 };

			return { success: true, newEntry: returnedEntry };
		} catch (error) {
			console.error('Failed to insert guestbook entry:', error);
			return fail(500, { content, error: 'Failed to save message' });
		}
	},
	like: async (event) => {
		if (!event.locals.user) return fail(401);

		const formData = await event.request.formData();
		const guestBookId = parseInt(formData.get('guestBookId') as string);

		if (isNaN(guestBookId)) return fail(400);

		try {
			await db.transaction(async (tx) => {
				const [exist] = await tx
					.select({ id: table.guestBookLike.guestBookId })
					.from(table.guestBookLike)
					.where(and(eq(table.guestBookLike.guestBookId, guestBookId), eq(table.guestBookLike.userId, event.locals.user!.id)));

				if (exist) {
					await tx
						.delete(table.guestBookLike)
						.where(and(eq(table.guestBookLike.guestBookId, guestBookId), eq(table.guestBookLike.userId, event.locals.user!.id)));
				} else {
					const [guestBookExists] = await tx.select({ id: table.guestBook.id }).from(table.guestBook).where(eq(table.guestBook.id, guestBookId));
					if (!guestBookExists) return;
					await tx.insert(table.guestBookLike).values({ guestBookId: guestBookId, userId: event.locals.user!.id });
				}
			});
			return { success: true };
		} catch (error) {
			console.error('Failed to update like status:', error);
			return fail(500, { error: 'Could not update like status' });
		}
	},
	delete: async (event) => {
		if (!event.locals.user) return fail(401);

		const formData = await event.request.formData();
		const guestBookId = parseInt(formData.get('guestBookId') as string);

		if (isNaN(guestBookId)) return fail(400);

		try {
			await db.delete(table.guestBook).where(and(eq(table.guestBook.id, guestBookId), eq(table.guestBook.userId, event.locals.user.id)));
			return { success: true };
		} catch (error) {
			console.error('Failed to delete guestbook entry:', error);
			return fail(500, { error: 'Could not delete message' });
		}
	}
};
