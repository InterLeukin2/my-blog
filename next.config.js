/** @type {import('next').NextConfig} */
const config = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/my-blog' : '',
    experimental: {
      turbo: {}, // 设置为对象而不是布尔值
    },
  }
  
  module.exports = config