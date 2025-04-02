import { sequence } from '@sveltejs/kit/hooks';
import { validateSessionToken, setSessionTokenCookie, deleteSessionTokenCookie } from '$lib/server/db/session';

import type { Handle } from '@sveltejs/kit';

const preloadHandle: Handle = async ({ event, resolve }) => {
	const fonts = ['commit-mono-latin-400-normal'];

	const response = await resolve(event, {
		preload: ({ type, path }) => {
			if (type === 'font') {
				if (!path.endsWith('.woff2')) return false;
				return fonts.some((font) => path.includes(font));
			}

			return type === 'js' || type === 'css';
		}
	});

	return response;
};

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;

	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);

	if (session !== null) setSessionTokenCookie(event, token, session.expiresAt);
	else deleteSessionTokenCookie(event);

	event.locals.session = session;
	event.locals.user = user;

	return resolve(event);
};

export const handle = sequence(preloadHandle, authHandle);
