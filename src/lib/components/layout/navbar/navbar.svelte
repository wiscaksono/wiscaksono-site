<script lang="ts">
	import { page } from '$app/state';
	import { navbarMenu } from './navbar-menu';
	import NavbarListener from './navbar-listener.svelte';

	let currentPath = $derived(page.url.pathname);

	const isActive = (href: string, currentPath: string) => {
		if (currentPath === href) return true;
		if (href !== '/' && currentPath.startsWith(href + '/')) return true;
		return false;
	};

	const getHighlightedParts = (title: string, key: string) => {
		if (!title || !key || key.length !== 1) return { before: title, highlighted: null, after: null };

		const index = title.toLowerCase().indexOf(key.toLowerCase());

		// Key not found in title
		if (index === -1) return { before: title, highlighted: null, after: null };

		// Return the parts, preserving original case for the highlighted character
		return {
			before: title.substring(0, index),
			highlighted: title.substring(index, index + 1), // Get the char from original title
			after: title.substring(index + 1)
		};
	};
</script>

<NavbarListener />

<nav class="overflow-x-auto text-sm select-none md:text-base lg:px-4 lg:py-3">
	<div class="hidden items-center justify-between gap-2 px-2 lg:flex lg:px-0">
		<div class="flex items-center gap-2">
			<div class="bg-ash-200 h-4 w-1.5"></div>
			<a class="flex items-center" href="https://github.com/wiscaksono/wiscaksono-site" target="_blank" rel="norreferrer">
				<svg
					class="mr-1 h-3 w-3"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="6" x2="6" y1="3" y2="15"></line>
					<circle cx="18" cy="6" r="3"></circle>
					<circle cx="6" cy="18" r="3"></circle>
					<path d="M18 9a9 9 0 0 1-9 9"></path>
				</svg>
				main
			</a>
		</div>
		<p>-- VIEW --</p>
	</div>
	<div class="flex items-center justify-between gap-20 overflow-x-auto px-2 py-3 leading-none lg:px-0 lg:py-0">
		<ul class="flex items-center">
			{#each navbarMenu as { title, href, key }, i (i)}
				{@const parts = getHighlightedParts(title, key)}
				{@const isOnCurrentPath = isActive(href, currentPath)}

				<li class="shrink-0">
					<a
						{href}
						data-sveltekit-preload-code="eager"
						data-sveltekit-preload-data
						class={`text-ash-300 flex items-center px-2 py-0.5 leading-none transition-all ${isOnCurrentPath ? 'bg-ash-300 text-ash-800' : ''}`}
						aria-label={`${title} (Shortcut: ${key})`}
					>
						{parts.before}{#if parts.highlighted}<span class={`${isOnCurrentPath ? 'text-ash-800' : 'text-ash-100'} transition-all`}>{parts.highlighted}</span
							>{/if}{parts.after}
					</a>
				</li>
			{/each}
		</ul>
		<div class="not-sr-only hidden items-center gap-2 lg:flex">
			<a class="bg-ash-300 shrink-0 px-2 py-0.5 leading-none text-black" href="https://github.com/wiscaksono" target="_blank" rel="noreferrer">Wiscaksono</a>
		</div>
	</div>
</nav>
