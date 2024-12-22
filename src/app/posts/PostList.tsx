import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import styles from './posts.module.css'

const POSTS_DIR = join(process.cwd(), 'src', 'posts')

interface Post {
  slug: string
  title: string
  date: string
  description: string
  published: boolean
}

async function getPosts(): Promise<Post[]> {
  const files = readdirSync(POSTS_DIR)
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = join(POSTS_DIR, file)
      
      try {
        const fileContents = readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          published: data.published || false,
        } satisfies Post
      } catch (error) {
        console.error(`Error reading post ${file}:`, error)
        return null
      }
    })
    .filter((post): post is Post => post !== null)  // 类型守卫
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export default async function PostList() {
  const posts = await getPosts()
  
  return (
    <div className={styles.posts}>
      {posts.map(post => (
        <Link href={`/posts/${post.slug}`} key={post.slug} className={styles.post}>
          <h2>{post.title}</h2>
          <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
          <p>{post.description}</p>
        </Link>
      ))}
    </div>
  )
} 