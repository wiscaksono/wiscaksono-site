// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User, Session } from '$lib/server/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

declare module '*.mdx' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}
