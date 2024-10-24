import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false
  },
  experimental: {
    reactCompiler: true
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
