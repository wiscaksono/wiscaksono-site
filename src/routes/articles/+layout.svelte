<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<section class="flex-1 flex-grow overflow-y-auto px-3 lg:px-4">
	{@render children()}
</section>
