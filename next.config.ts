import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  trailingSlash: true,
  async headers() {
    return [
      { source: '/:all*(svg|webp|png|jpg|woff2)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] },
    ]
  },
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.grupobluepoint.pe' }], destination: 'https://grupobluepoint.pe/:path*', permanent: true }]
  },
}

export default nextConfig
