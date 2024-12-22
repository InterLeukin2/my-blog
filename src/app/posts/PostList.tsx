import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import styles from '../page.module.css'

const POSTS_DIR = join(process.cwd(), 'src', 'posts')

function getPosts() {
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

export default function PostList() {
  const posts = getPosts()

  return (
    <div className={styles.posts}>
      <h2>最近更新</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>
              {post.title}
              <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
} 