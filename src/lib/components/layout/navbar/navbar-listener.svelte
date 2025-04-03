<script lang="ts">
	import { goto } from '$app/navigation';

	import { navbarMenu } from './navbar-menu';

	const handleKeydown = (e: KeyboardEvent) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

		const menuItem = navbarMenu.find((item) => item.key === e.key.toLowerCase());
		if (menuItem) goto(menuItem.href);
	};
</script>

<svelte:window onkeydown={handleKeydown} />
