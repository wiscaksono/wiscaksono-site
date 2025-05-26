import type { Article } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	const articles: Article[] = [];

	const paths = import.meta.glob('/src/contents/articles/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Article, 'slug'>;
			const article = { ...metadata, slug } satisfies Article;
			articles.push(article);
		}
	}

	articles.sort((a, b) => {
		const dateA = new Date(a.publishedDate);
		const dateB = new Date(b.publishedDate);
		return dateB.getTime() - dateA.getTime();
	});

	setHeaders({ 'Cache-Control': 'public, max-age=3600, s-maxage=86400' });

	return { articles };
};
