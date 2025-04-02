<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/icon.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<section class="flex-1 flex-grow overflow-y-auto px-3 lg:px-4">
	<nav class="bg-ash-700 sticky top-0 z-50 mb-2 flex items-center overflow-x-auto select-none">
		{#each data.posts as post, i (i)}
			<a
				href={`/abouts/${post.slug}`}
				class={`flex shrink-0 items-center gap-1.5 px-3 py-0.5 leading-none transition-all ${page.params.slug === post.slug ? 'bg-ash-300 text-ash-800' : 'text-ash-300'}`}
			>
				<Icon name={post.title.split('.').pop() ?? ''} />
				{post.title}
			</a>
		{/each}
	</nav>
	{@render children()}
</section>
