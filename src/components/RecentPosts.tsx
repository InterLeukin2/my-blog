'use client'

import styles from '@/styles/RecentPosts.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  slug: string
  title: string
  date: string
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error))
  }, [])

  return (
    <div className={styles.recentPosts}>
      <h3 className={styles.title}>最近更新</h3>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/posts/${post.slug}`}>
              <div className={styles.postContent}>
                <span className={styles.postTitle}>{post.title}</span>
                <span className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 