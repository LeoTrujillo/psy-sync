import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Si luego importas packages externos al app (packages/ui):
  // experimental: { externalDir: true },
  // transpilePackages: ['@psy-sync/ui', '@psy-sync/types', '@psy-sync/config'],
}

export default nextConfig
