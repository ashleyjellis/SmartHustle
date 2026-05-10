import type { NextConfig } from 'next'

const DATA_GLOB = ['./data/**/*']

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Bundle data/providers.json into every serverless function that reads it.
  // Without this Vercel's file tracer misses the dynamic fs.readFileSync path
  // and the function crashes at runtime, surfacing as a 404.
  outputFileTracingIncludes: {
    '/': DATA_GLOB,
    '/business-banking': DATA_GLOB,
    '/admin': DATA_GLOB,
    '/api/providers': DATA_GLOB,
    '/api/providers/[id]': DATA_GLOB,
  },
}

export default nextConfig
