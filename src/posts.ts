import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 直接使用 src/posts 目录
const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getAllPosts() {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found:', postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
      }
    })
  
  // 按日期降序排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
} 