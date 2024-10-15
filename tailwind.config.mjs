import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "64rem", // add required value here
					},
				},
			},
			fontFamily: {
				sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
				mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
