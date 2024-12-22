// src/app/api/posts/route.ts

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

// 修正为正确的 posts 目录路径
const POSTS_DIR = join(process.cwd(), 'src', 'posts')

// 强制静态导出
export const dynamic = 'force-static'

// 配置 revalidate 时间
export const revalidate = 60  // 每 60 秒重新验证

export async function GET() {
  try {
    const fileNames = readdirSync(POSTS_DIR)
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx?$/, '')
        const fullPath = join(POSTS_DIR, fileName)
        const fileContents = readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        // 检查日期字段，如果不存在则赋值为当前时间
        const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString()

        return {
          slug,
          title: data.title || slug,
          date,  // 确保日期字段有有效的值
        }
      })
    
    // 按照日期降序排序
    posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error reading posts:', error)
    return NextResponse.json([])  // 处理错误并返回空数组
  }
}