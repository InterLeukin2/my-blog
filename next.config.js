/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础配置
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // 图片配置
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },

  // 添加日志
  onDemandEntries: {
    // 开发模式的页面缓存时间
    maxInactiveAge: 25 * 1000,
    // 同时缓存的页面数
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig 