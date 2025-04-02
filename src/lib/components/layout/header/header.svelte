<script lang="ts">
	import Face from './face.svelte';

	interface $$Props {
		isFullscreen: boolean;
		onMouseDown: (e: MouseEvent) => void;
		toggleFullscreen: () => void;
	}

	let { isFullscreen, onMouseDown, toggleFullscreen }: $$Props = $props();

	function handleHeaderKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleFullscreen();
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<header
	class={`relative flex cursor-default items-center justify-between overflow-hidden px-4 py-3 ${isFullscreen ? 'lg:cursor-pointer' : 'lg:cursor-grab lg:active:cursor-grabbing'}`}
	ondblclick={toggleFullscreen}
	onmousedown={onMouseDown}
	onkeydown={handleHeaderKeyDown}
>
	<div class="group absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex">
		<button class="grid h-6 w-6 place-items-center rounded-full" onclick={() => window.close()} aria-label="Close">
			<div class="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#FF6057]"></div>
		</button>
		<button class="grid h-6 w-6 place-items-center rounded-full" aria-label="Minimize">
			<div class="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#FEBC2D]"></div>
		</button>
		<button class="grid h-6 w-6 place-items-center rounded-full" onclick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
			<div class="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#2BC840]"></div>
		</button>
	</div>
	<p class="not-sr-only mx-auto hidden font-semibold select-none lg:block">Ghostty</p>
	<p class="not-sr-only mx-auto block font-semibold select-none lg:hidden">Wiscaksono</p>
	<Face />
</header>
