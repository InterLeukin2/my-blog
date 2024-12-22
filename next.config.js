/** @type {import('next').NextConfig} */
const config = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/my-blog' : '',
    experimental: {
      turbo: { 
        enabled: true,  // 启用 Turbopack
      },
    },
  }
  
  module.exports = config;