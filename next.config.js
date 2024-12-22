/** @type {import('next').NextConfig} */
const config = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/my-blog' : '',
    experimental: {
      turbo: {},  // 启用 Turbo 配置，设置为空对象
    },
  };
  
  module.exports = config;