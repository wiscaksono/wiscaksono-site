import { defineCollection, z } from "astro:content";

const aboutCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		icon: z.string(),
		summary: z.string(),
	}),
});

const articleCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedDate: z.string(),
	}),
});

const projectCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			image: image(),
			technologies: z.array(z.string()),
		}),
});

export const collections = {
	abouts: aboutCollection,
	articles: articleCollection,
	projects: projectCollection,
};
