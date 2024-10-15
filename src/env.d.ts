/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
	readonly UMAMI_SHARE_TOKEN: string;
	readonly UMAMI_URL: string;
	readonly UMAMI_WEBSITE_ID: string;

	readonly GITHUB_CLIENT_SECRET: string;
	readonly GITHUB_CLIENT_ID: string;
	readonly AUTH_SECRET: string;

	readonly APP_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
