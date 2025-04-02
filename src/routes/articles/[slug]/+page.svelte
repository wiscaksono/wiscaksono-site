<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Metadata title={data.meta.title + ' | Wiscaksono'} description={data.meta.description} image={data.meta.poster} />

<header class="group border-ash-700 bg-ash-700 relative mb-5 aspect-video overflow-hidden border lg:aspect-[3/1]">
	<img src={data.meta.poster} alt={data.meta.title} class="size-full object-cover object-center" />
	<div class="absolute top-0 left-0 grid h-full w-full place-items-center bg-[#080808]/80 transition-opacity duration-500 group-hover:opacity-0">
		<h1 class="max-w-[80%] px-4 text-center text-2xl font-semibold uppercase lg:max-w-[60%] lg:text-4xl">
			{data.meta.title}
		</h1>
	</div>
	<p
		class="absolute bottom-2 left-1/2 w-full -translate-x-1/2 text-center text-sm opacity-100 transition-opacity duration-500 group-hover:opacity-0 lg:text-base"
	>
		Published on {data.meta.publishedDate}
	</p>
	<div
		aria-hidden="true"
		class="absolute top-0 left-0 h-full w-full bg-repeat opacity-[2%] group-hover:opacity-0"
		style="background-image: url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
	></div>
</header>

<article
	class="prose prose-headings:text-ash-200 prose-p:text-ash-400 prose-code:text-ash-300 prose-strong:text-ash-200 prose-li:text-ash-400 prose-li:marker:text-ash-300 prose-a:text-ash-200 prose-blockquote:border-ash-500 prose-p:indent-5 prose-td:text-ash-300 prose-thead:border-ash-300 prose-tr:border-ash-500 mx-auto max-w-3xl"
>
	<data.content />
</article>
