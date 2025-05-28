/**
 * Generates route entry objects from markdown files in the specified content directory.
 *
 * This function scans the `/src/contents/[contentType]` directory for `.md` files,
 * extracts their filenames as slugs, and returns an array of route parameter objects.
 *
 * @param contentType - The type of content to generate entries for.
 * Must be one of `'abouts'`, `'articles'`, or `'projects'`.
 *
 * @returns An array of objects in the form `{ slug: string }`,
 * where each slug is derived from a markdown file name.
 */
export function generateEntries(contentType: 'abouts' | 'articles' | 'projects') {
	let data = null;

	// import.meta.glob() does not work with variables
	// See: https://github.com/vitejs/vite/issues/5478
	switch (contentType) {
		case 'abouts':
			data = Object.keys(import.meta.glob('/src/contents/abouts/*.md', { eager: true }));
			break;
		case 'articles':
			data = Object.keys(import.meta.glob('/src/contents/articles/*.md', { eager: true }));
			break;
		case 'projects':
			data = Object.keys(import.meta.glob('/src/contents/projects/*.md', { eager: true }));
			break;
		default:
			throw new Error(`Invalid content type: ${contentType}`);
	}

	return data
		.map((path) => path.split('/').pop()?.replace('.md', ''))
		.filter((slug): slug is string => typeof slug === 'string')
		.map((slug) => ({ slug }));
}
