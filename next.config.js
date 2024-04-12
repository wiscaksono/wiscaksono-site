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
  logging: {
    fetches: {
      fullUrl: true
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
  }
}

module.exports = withContentlayer(nextConfig)
