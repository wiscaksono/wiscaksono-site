<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	import '../app.css';
	import { dev } from '$app/environment';
	import Header from '$lib/components/layout/header/header.svelte';
	import Navbar from '$lib/components/layout/navbar/navbar.svelte';

	let { children } = $props();

	let dragging = $state(false);
	let isFullscreen = $state(false);
	let offset = $state({ x: 0, y: 0 });
	let position = $state({ x: 0, y: 0 });
	let containerElement = $state<HTMLElement | null>(null);
	let isMobile = $derived(new MediaQuery('(max-width: 1024px)').current);

	function toggleFullscreen() {
		if (isMobile) return;
		if (!isFullscreen) containerElement?.requestFullscreen();
		else {
			document.exitFullscreen();
			position = { x: 0, y: 0 };
		}
		isFullscreen = !isFullscreen;
	}

	function onMouseDown(e: MouseEvent) {
		if (isMobile) return;
		dragging = true;
		offset = { x: e.clientX - position.x, y: e.clientY - position.y };
	}

	$effect(() => {
		if (isMobile) return;

		const controller = new AbortController();

		const handleMouseUp = () => (dragging = false);

		const handleMouseMove = (e: MouseEvent) => {
			if (dragging) position = { x: e.clientX - offset.x, y: e.clientY - offset.y };
		};

		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) isFullscreen = false;
		};

		window.addEventListener('mouseup', handleMouseUp, { signal: controller.signal });
		window.addEventListener('mousemove', handleMouseMove, { signal: controller.signal });
		document.addEventListener('fullscreenchange', handleFullscreenChange, { signal: controller.signal });

		return () => controller.abort();
	});
</script>

<svelte:head>
	{#if !dev}
		<script defer src="https://umami.wiscaksono.com/script.js" data-website-id="1f3b0505-7366-47bd-8757-95ad25395088"></script>
	{/if}
</svelte:head>

<div class="bg-ash-600 text-ash-300 grid h-dvh place-items-center overflow-hidden font-mono antialiased">
	<main
		bind:this={containerElement}
		class={`from-ash-800 to-ash-700 z-10 flex h-dvh w-dvw flex-col overflow-hidden bg-gradient-to-tr lg:h-[75dvh] lg:w-[70dvw] ${isFullscreen || isMobile ? 'rounded-none' : 'rounded-xl'}`}
		class:container-shadow={!isFullscreen || !isMobile}
		style:transform="translate({position.x}px, {position.y}px)"
		style:transition={dragging ? 'none' : 'all 0.2s ease-out'}
	>
		<Header {isFullscreen} {onMouseDown} {toggleFullscreen} />
		{@render children()}
		<Navbar />
	</main>

	<div class="grid-pattern absolute top-0 left-0 h-full w-full" aria-hidden="true"></div>
	<div class="grain-noise pointer-events-none fixed top-0 size-[300%]" aria-hidden="true"></div>
	{#await import('$lib/components/layout/particle.svelte') then { default: Particle }}
		<Particle />
	{/await}
</div>

<style>
	.grid-pattern {
		background-image:
			linear-gradient(to right, var(--color-ash-500) 2px, transparent 2px), linear-gradient(to bottom, var(--color-ash-500) 2px, transparent 2px);
		background-size: 5vh 5vh;
		background-position: center;
		opacity: 0.2;
	}

	.grain-noise {
		background-image: url('/grain.webp');
		animation: animate-grain 8s steps(10) infinite;
		opacity: 0.05;
	}

	.container-shadow {
		animation: animate-wave-shadow 8s ease-in-out infinite;
	}

	@keyframes animate-wave-shadow {
		0%,
		100% {
			box-shadow:
				0px 0px 0px 1px rgba(165, 165, 165, 0.04),
				-9px 9px 9px -0.5px rgba(0, 0, 0, 0.04),
				-18px 18px 18px -1.5px rgba(0, 0, 0, 0.08),
				-37px 37px 37px -3px rgba(0, 0, 0, 0.16),
				-75px 75px 75px -6px rgba(0, 0, 0, 0.24),
				-150px 150px 150px -12px rgba(0, 0, 0, 0.48);
		}
		25% {
			box-shadow:
				0px 0px 0px 1px rgba(165, 165, 165, 0.04),
				-7px 11px 9px -0.5px rgba(0, 0, 0, 0.04),
				-14px 22px 18px -1.5px rgba(0, 0, 0, 0.08),
				-29px 45px 37px -3px rgba(0, 0, 0, 0.16),
				-59px 91px 75px -6px rgba(0, 0, 0, 0.24),
				-118px 182px 150px -12px rgba(0, 0, 0, 0.48);
		}
		50% {
			box-shadow:
				0px 0px 0px 1px rgba(165, 165, 165, 0.04),
				-9px 9px 9px -0.5px rgba(0, 0, 0, 0.04),
				-18px 18px 18px -1.5px rgba(0, 0, 0, 0.08),
				-37px 37px 37px -3px rgba(0, 0, 0, 0.16),
				-75px 75px 75px -6px rgba(0, 0, 0, 0.24),
				-150px 150px 150px -12px rgba(0, 0, 0, 0.48);
		}
		75% {
			box-shadow:
				0px 0px 0px 1px rgba(165, 165, 165, 0.04),
				-11px 7px 9px -0.5px rgba(0, 0, 0, 0.04),
				-22px 14px 18px -1.5px rgba(0, 0, 0, 0.08),
				-45px 29px 37px -3px rgba(0, 0, 0, 0.16),
				-91px 59px 75px -6px rgba(0, 0, 0, 0.24),
				-182px 118px 150px -12px rgba(0, 0, 0, 0.48);
		}
	}

	@keyframes animate-grain {
		0%,
		100% {
			transform: translate(0);
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translate(-5%, -10%);
		}
		20%,
		40%,
		60%,
		80%,
		100% {
			transform: translate(-15%, -20%);
		}
	}
</style>
