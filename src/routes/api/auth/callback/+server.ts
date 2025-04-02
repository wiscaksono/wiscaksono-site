import { github } from '$lib/server/oauth';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { createUser, getUserFromGitHubId } from '$lib/server/db/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/db/session';

import type { OAuth2Tokens } from 'arctic';
import type { RequestEvent } from './$types';

const GITHUB_USER_API_URL = 'https://api.github.com/user';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	// 1. Validate state and code
	if (!storedState || !code || !state) return createErrorResponse('Invalid request parameters.');
	if (storedState !== state) return createErrorResponse('Invalid state parameter.');

	// 2. Validate authorization code with GitHub
	let tokens: OAuth2Tokens;

	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		console.error('Failed to validate GitHub authorization code:', e);
		return createErrorResponse('Failed to validate authorization code.');
	}

	const githubAccessToken = tokens.accessToken();

	// 3. Fetch GitHub user data
	const githubUserData = await fetchGitHubApi<{ id: number; login: string }>(GITHUB_USER_API_URL, githubAccessToken);
	if (!githubUserData) return createErrorResponse('Failed to fetch GitHub user data.');

	const userParser = new ObjectParser(githubUserData);
	const githubUserId = userParser.getNumber('id');
	const username = userParser.getString('login');

	// 4. Check if user exists
	const existingUser = await getUserFromGitHubId(githubUserId);

	// 5a. Existing user: Log them in
	if (existingUser) return await handleSuccessfulLogin(event, existingUser.id);

	try {
		const newUser = await createUser(githubUserId, username);
		return await handleSuccessfulLogin(event, newUser.id);
	} catch (error) {
		console.error('Failed to create user:', error);
		return createErrorResponse('Failed to create user account.', 500);
	}
}

/**
 * Fetches data from a GitHub API endpoint using an access token.
 */
async function fetchGitHubApi<T = unknown>(url: string, accessToken: string): Promise<T | null> {
	try {
		const request = new Request(url);
		request.headers.set('Authorization', `Bearer ${accessToken}`);
		const response = await fetch(request);

		if (!response.ok) {
			console.error(`GitHub API request failed (${response.status}): ${url}`);
			return null;
		}

		return (await response.json()) as T;
	} catch (error) {
		console.error(`Error fetching GitHub API (${url}):`, error);
		return null;
	}
}

/**
 * Creates a standard error response.
 */
function createErrorResponse(message: string, status: number = 400) {
	console.error(`OAuth Error (${status}): ${message}`);
	return new Response(message, { status });
}

/**
 * Handles successful login/signup: creates session, sets cookie, returns redirect.
 */
async function handleSuccessfulLogin(event: RequestEvent, userId: number) {
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, { status: 302, headers: { Location: '/guest-book' } });
}
