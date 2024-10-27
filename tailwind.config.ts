import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      keyframes: {
        'animate-grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate(-5%, -10%)' },
          '20%, 40%, 60%, 80%, 100%': { transform: 'translate(-15%, -20%)' }
        }
      },
      animation: { grain: 'animate-grain 8s steps(10) infinite' },
      backgroundImage: { 'grain-noise': "url('/grain.webp')" }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
