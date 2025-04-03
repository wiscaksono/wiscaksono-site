<script lang="ts">
	import { page } from '$app/state';
	import Metadata from '$lib/components/metadata.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let activeTechstack = $state<string>('');

	$effect(() => {
		activeTechstack = page.url.searchParams.get('techstack') || '';
	});

	let articles = $derived.by(() => {
		if (activeTechstack === '') return data.items;
		return data.items.filter((item) => item.techstack?.includes(activeTechstack));
	});
</script>

<Metadata
	title="Projects | Wiscaksono"
	description="Discover the interactive brilliance of my projects, peruse my polished portfolio, and delve into a sneak peek of my formidable technical prowess. Uncover a world where innovation meets functionality, showcased through a meticulously crafted Next.js application. Elevate your digital experience with a seamless blend of creativity and technical finesse."
/>

<h1 class="sr-only">Wisnu Wicaksono's Projects</h1>

<main class="grid flex-1 flex-grow gap-2 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each articles as article, i (i)}
		<a
			href={`/projects/${article.slug}` + (activeTechstack ? `?techstack=${activeTechstack}` : '')}
			class="divide-ash-700 border-ash-700 divide-y overflow-hidden border select-none"
			aria-label={`View details for project: ${article.title}`}
			data-sveltekit-preload-code="eager"
		>
			<figure class="group relative aspect-video">
				<img
					src={article.poster}
					alt={article.title}
					class="aspect-video object-cover object-center grayscale-[50%] transition-all duration-500 group-hover:grayscale-0"
					loading="lazy"
				/>
				<div class="absolute top-0 left-0 grid h-full w-full place-items-center bg-[#080808]/90 transition-opacity duration-500 group-hover:opacity-0">
					<p class="px-4 text-center text-3xl font-semibold uppercase">{article.title}</p>
				</div>
				<div
					aria-hidden="true"
					class="absolute top-0 left-0 h-full w-full bg-repeat opacity-[2%] group-hover:opacity-0"
					style="background-image: url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
				></div>
			</figure>
			<div class="p-2">
				<p class="line-clamp-4 text-sm">{article.description}</p>
			</div>
		</a>
	{/each}
</main>
