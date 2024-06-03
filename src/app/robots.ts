import { ENV } from '@/lib/constants'

export default function robots() {
  const URL = ENV.NEXT_PUBLIC_WEBSITE_URL
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${URL}/sitemap.xml`,
    host: URL
  }
}
