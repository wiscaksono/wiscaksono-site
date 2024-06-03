import { ENV } from '@/lib/constants'
import { getContents } from '@/lib/contents'

export default async function sitemap() {
  const URL = ENV.NEXT_PUBLIC_WEBSITE_URL

  const routes = ['', '/guest-book', '/articles', '/coding-activity', '/coding-activity/activity', '/coding-activity/editor', '/coding-activity/operating-systems'].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const aboutRoutes = getContents('abouts').map(route => ({
    url: `${URL}/abouts/${route.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const projectsRoutes = getContents('projects').map(route => ({
    url: `${URL}/projects/${route.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const articleRoutes = getContents('articles').map(route => ({
    url: `${URL}/articles/${route.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...aboutRoutes, ...projectsRoutes, ...articleRoutes]
}
