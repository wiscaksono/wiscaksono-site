import fs from 'fs';
import { BASE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

function generateUrlData(globResult: Record<string, unknown>, prefix: string) {
	return Object.keys(globResult)
		.map((path) => {
			const slug = path.split('/').at(-1)?.replace('.md', '');
			if (!slug) return null; // Skip if slug extraction fails

			const loc = `${BASE_URL}${prefix}/${slug}`;
			let lastmod: string | undefined;

			try {
				const filePath = `.${path}`; // Prepend '.' to make it relative for fs
				const stats = fs.statSync(filePath);
				lastmod = stats.mtime.toISOString();
			} catch (error) {
				console.error(`Error getting stats for ${path}:`, error);
			}

			let changefreq = 'monthly';
			let priority: number = 0.7;

			if (prefix === '/articles') {
				changefreq = 'weekly';
				priority = 0.8;
			} else if (prefix === '/projects') {
				changefreq = 'monthly';
				priority = 0.6;
			} else if (prefix === '/abouts') {
				changefreq = 'yearly';
				priority = 0.5;
			}

			return { loc, lastmod, changefreq, priority };
		})
		.filter((data) => data !== null); // Filter out nulls
}

function escapeXml(unsafe: string): string {
	return unsafe.replace(
		/[&<"'>]/g,
		(match) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'"': '&quot;',
				"'": '&apos;',
				'>': '&gt;'
			})[match] || match
	);
}

export const GET: RequestHandler = async () => {
	const [articleUrlData, projectUrlData, aboutUrlData] = await Promise.all([
		generateUrlData(import.meta.glob('/src/contents/articles/*.md'), '/articles'),
		generateUrlData(import.meta.glob('/src/contents/projects/*.md'), '/projects'),
		generateUrlData(import.meta.glob('/src/contents/abouts/*.md'), '/abouts')
	]);

	const allUrlData = [
		{
			loc: `${BASE_URL}/`,
			changefreq: 'yearly',
			priority: 1.0,
			lastmod: new Date().toISOString()
		},
		{
			loc: `${BASE_URL}/projects`,
			changefreq: 'monthly',
			priority: 1.0,
			lastmod: new Date().toISOString()
		},
		{
			loc: `${BASE_URL}/guestbook`,
			changefreq: 'daily',
			priority: 1.0,
			lastmod: new Date().toISOString()
		},
		{
			loc: `${BASE_URL}/articles`,
			changefreq: 'monthly',
			priority: 1.0,
			lastmod: new Date().toISOString()
		},
		...articleUrlData,
		...projectUrlData,
		...aboutUrlData
	];

	const urlElements = allUrlData
		.map(({ loc, lastmod, changefreq, priority }) => {
			const lastmodElement = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
			return `
    <url>
      <loc>${escapeXml(loc)}</loc>${lastmodElement}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority.toFixed(1)}</priority>
    </url>`;
		})
		.join('');

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${urlElements}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // 1 hour
			}
		}
	);
};
