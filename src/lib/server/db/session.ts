import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';

import { db } from './';
import * as table from './schema';

import type { RequestEvent } from '@sveltejs/kit';

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 15; // 15 days

/**
 * Validates a session token.
 */
export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	return await db.transaction(async (tx) => {
		const [session] = await tx.select().from(table.session).where(eq(table.session.id, sessionId));
		if (!session) return { session: null, user: null };

		const [user] = await tx.select().from(table.user).where(eq(table.user.id, session.userId));
		if (!user) return { session: null, user: null };

		const now = Date.now();

		if (now >= session.expiresAt.getTime()) {
			await tx.delete(table.session).where(eq(table.session.id, session.id));
			return { session: null, user: null };
		}

		if (now >= session.expiresAt.getTime() - REFRESH_INTERVAL) {
			session.expiresAt = new Date(Date.now() + EXPIRATION_TIME);
			await tx.update(table.session).set({ expiresAt: session.expiresAt }).where(eq(table.session.id, session.id));
		}

		return { session, user };
	});
}

/**
 * Invalidates a session by ID.
 */
export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

/**
 * Invalidates all sessions for a user.
 */
export async function invalidateUserSessions(userId: number) {
	await db.delete(table.session).where(eq(table.session.userId, userId));
}

/**
 * Sets a session token cookie.
 */
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, { httpOnly: true, path: '/', secure: import.meta.env.PROD, sameSite: 'lax', expires: expiresAt });
}

/**
 * Deletes a session token cookie.
 */
export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', { httpOnly: true, path: '/', secure: import.meta.env.PROD, sameSite: 'lax', maxAge: 0 });
}

/**
 * Generates a new session token.
 */
export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

/**
 * Creates a new session.
 */
export async function createSession(token: string, userId: number) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [session] = await db
		.insert(table.session)
		.values({ id: sessionId, userId, expiresAt: new Date(Date.now() + EXPIRATION_TIME) })
		.returning();
	return session;
}
