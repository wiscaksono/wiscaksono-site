import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../contents/articles/${params.slug}.md`);
		return { content: post.default, meta: post.metadata };
	} catch (e) {
		console.error(e);
		error(404, `Could not find ${params.slug}`);
	}
};
