import { relations } from 'drizzle-orm';
import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	githubId: integer('github_id').notNull().unique(),
	username: text('username').notNull().unique()
});
export type User = typeof user.$inferSelect;

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: serial('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { mode: 'date', withTimezone: true }).notNull()
});
export type Session = typeof session.$inferSelect;

export const usersRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	guestBooks: many(guestBook)
}));

export const sessionsRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] })
}));

export const guestBook = pgTable('guest_book', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	userId: serial('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull()
});

export const guestBookRelations = relations(guestBook, ({ one }) => ({
	user: one(user, { fields: [guestBook.userId], references: [user.id] })
}));

export const guestBookLike = pgTable('guest_book_like', {
	guestBookId: serial('guest_book_id')
		.notNull()
		.references(() => guestBook.id, { onDelete: 'cascade' }),
	userId: serial('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const guestBookLikeRelations = relations(guestBookLike, ({ one }) => ({
	guestBook: one(guestBook, { fields: [guestBookLike.guestBookId], references: [guestBook.id] }),
	user: one(user, { fields: [guestBookLike.userId], references: [user.id] })
}));
