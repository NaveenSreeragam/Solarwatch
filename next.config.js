/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'webtools.ccmc.gsfc.nasa.gov',
      }
    ],
  },
}

module.exports = nextConfig
