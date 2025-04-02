<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface $$Props extends Omit<SVGAttributes<SVGSVGElement>, 'class'> {
		name: string;
		title?: string; // Optional title for accessibility
	}

	let { name, title, ...props }: $$Props = $props();
</script>

<svg role="img" class="size-[14px]" {...props}>
	{#if title}<title>{title}</title>{/if}
	<use xlink:href={`/icons.svg#${name}`} href={`/icons.svg#${name}`} />
</svg>
