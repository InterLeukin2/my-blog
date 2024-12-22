import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 直接使用 src/posts 目录
const postsDirectory = path.join(process.cwd(), 'src/posts')

interface Post {
  slug: string
  title: string
  date: string
}

export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found:', postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData: Post[] = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')

      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const { data } = matter(fileContents)
      console.log('Post data:', data) // 输出每个 post 的 data，检查 date 字段

      // 确保 date 是有效的日期
      const date = data.date ? new Date(data.date) : new Date()
      return {
        slug,
        title: data.title || slug,
        date: date.toISOString(),  // 确保转换为 ISO 格式字符串
      }
    })

  // 按日期降序排序，确保 date 是有效的时间戳
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    // 检查日期是否有效，如果无效，返回当前日期的时间戳
    const validDateA = isNaN(dateA) ? new Date().getTime() : dateA
    const validDateB = isNaN(dateB) ? new Date().getTime() : dateB

    return validDateB - validDateA
  })
}