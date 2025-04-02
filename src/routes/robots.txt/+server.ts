import { BASE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(
		`User-Agent: *
Allow: /
Disallow: /api

Host: ${BASE_URL}
Sitemap: ${BASE_URL}/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'max-age=3600' // 1 hour
			}
		}
	);
};
