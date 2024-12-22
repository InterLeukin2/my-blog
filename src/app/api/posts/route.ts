import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

// 修正为正确的 posts 目录路径
const POSTS_DIR = join(process.cwd(), 'src', 'posts')

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
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
        }
      })
    
    posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error reading posts:', error)
    return NextResponse.json([])
  }
} 