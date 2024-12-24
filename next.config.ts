import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    }
  }
}

export default nextConfig
