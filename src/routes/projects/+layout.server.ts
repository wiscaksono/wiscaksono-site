import type { Project } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	let allTechstacks: string[] = [];
	const items: Project[] = [];

	const paths = import.meta.glob('/src/contents/projects/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Project, 'slug'> & { techstack?: string[] };
			const post = { ...metadata, slug } satisfies Project;
			items.push(post);
			if (metadata.techstack && Array.isArray(metadata.techstack)) allTechstacks = allTechstacks.concat(metadata.techstack);
		}
	}

	const uniqueTechstacks = ['All Projects', ...new Set(allTechstacks)];

	setHeaders({ 'Cache-Control': 'public, max-age=3600, s-maxage=86400' });

	return { items, techstacks: uniqueTechstacks };
};
