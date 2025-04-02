import type { About } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	const posts: About[] = [];

	const paths = import.meta.glob('/src/contents/abouts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<About, 'slug'>;
			const post = { ...metadata, slug } satisfies About;
			posts.push(post);
		}
	}

	setHeaders({ 'Cache-Control': 'public, max-age=3600, s-maxage=86400' });

	return { posts };
};
