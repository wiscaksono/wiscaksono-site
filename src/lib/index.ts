export const getSlugs = (content: 'articles' | 'projects' | 'abouts') => {
	const slugs = [];
	const paths = import.meta.glob(`/src/contents/${content}/*.md`, { eager: true });
	for (const path in paths) {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		slugs.push(slug ?? '');
	}

	return slugs.map((slug) => ({ slug }));
};
