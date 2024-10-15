// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import auth from "auth-astro";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	site:
		import.meta.env.MODE === "development"
			? "http://localhost:4321"
			: "https://wiscaksono.com",
	redirects: {
		"/abouts": {
			status: 301, // Permanent redirect
			destination: "/abouts/personal",
		},
	},
	integrations: [tailwind({ applyBaseStyles: false }), sitemap(), auth()],
	markdown: {
		shikiConfig: {
			theme: "poimandres",
			wrap: true,
		},
	},
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});

