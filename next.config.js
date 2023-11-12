const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    webpackBuildWorker: true,
    serverActions: {
      enabled: true
    }
  },
  redirects() {
    return [
      {
        source: '/about',
        destination: '/about/personal.ts',
        permanent: true
      }
    ]
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  }
}

module.exports = withContentlayer(nextConfig)
