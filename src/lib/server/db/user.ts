import { eq } from 'drizzle-orm';

import { db } from './';
import * as table from './schema';

/**
 * Creates a new user account.
 */
export async function createUser(githubId: number, username: string) {
	const [user] = await db.insert(table.user).values({ githubId, username }).returning();
	return user;
}

/**
 * Retrieves a user account by GitHub ID.
 */
export async function getUserFromGitHubId(githubId: number) {
	const [user] = await db.select().from(table.user).where(eq(table.user.githubId, githubId));
	if (!user) return null;
	return user;
}
