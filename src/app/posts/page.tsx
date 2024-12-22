import { Metadata } from 'next'
import PostList from './PostList'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '博客文章',
  description: '所有博客文章列表',
}

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>博客文章</h1>
      <PostList />
    </div>
  )
}