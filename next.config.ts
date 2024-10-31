import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    nextScriptWorkers: true
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
