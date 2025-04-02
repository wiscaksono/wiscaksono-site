<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import Eye from './eye.svelte';

	let clicked = $state(false);

	let mounted = $state(false);
	onMount(() => (mounted = true));
</script>

{#if mounted}
	<div
		role="button"
		tabindex="0"
		onclick={() => (clicked = !clicked)}
		ondblclick={(e) => e.stopPropagation()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') clicked = !clicked;
		}}
		aria-pressed={clicked}
		aria-label="Face expression toggle"
		class="not-sr-only absolute top-1/2 right-4 hidden -translate-y-1/2 items-center transition-transform duration-300 select-none lg:flex"
		in:fly|global={{ duration: 300 }}
	>
		<div class="flex items-center space-x-1.5">
			<Eye />
			<span class={`transition-all duration-300 ${clicked ? 'mt-5 rotate-180' : 'mt-2.5'}`}>‿</span>
			<Eye />
		</div>
	</div>
{/if}
