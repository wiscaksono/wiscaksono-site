<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/icon.svelte';

	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	// State to hold the active techstack, only updated client-side
	let activeTechstack = $state<string>('');

	$effect(() => {
		activeTechstack = page.url.searchParams.get('techstack') || '';
	});
</script>

<main class="flex-1 flex-grow overflow-y-auto px-3 lg:px-4">
	<nav class="bg-ash-700 sticky top-0 z-50 mb-2 flex items-center overflow-x-auto select-none">
		{#each data.techstacks as item, i (i)}
			<a
				href={item === 'All Projects' ? '/projects' : `/projects?techstack=${item}`}
				class={`flex shrink-0 items-center gap-1.5 px-3 py-0.5 leading-none transition-all ${activeTechstack === item || (activeTechstack === '' && item === 'All Projects') ? 'bg-ash-300 text-ash-800' : 'text-ash-300'}`}
				aria-label={`Filter by ${item ?? 'All Projects'}`}
			>
				{#if item !== 'All Projects'}
					<Icon name={item ?? ''} aria-hidden="true" />
				{/if}
				<span class="sr-only">Filter by {item}</span>
				{item}
			</a>
		{/each}
	</nav>
	{@render children()}
</main>
