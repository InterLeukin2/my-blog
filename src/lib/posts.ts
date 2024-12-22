import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = join(process.cwd(), 'src', 'posts')

export function getPosts() {
  const posts = readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const content = readFileSync(join(POSTS_DIR, file), 'utf8')
      const { data } = matter(content)
      
      if (data.published === false || file === 'template.mdx') {
        return null
      }
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        date: data.date,
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
} 