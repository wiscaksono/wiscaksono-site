export const ENV = {
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: '',

  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  AUTH_SECRET: process.env.AUTH_SECRET || 'some-secret',

  UMAMI_SHARE_TOKEN: process.env.UMAMI_SHARE_TOKEN || '',
  UMAMI_URL: process.env.UMAMI_URL || '',

  NODE_ENV: process.env.NODE_ENV || 'development'
}
