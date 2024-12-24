import { MetadataRoute } from 'next'
import { ENV } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const URL = ENV.NEXT_PUBLIC_WEBSITE_URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api'
    },
    sitemap: `${URL}/sitemap.xml`,
    host: URL
  }
}
