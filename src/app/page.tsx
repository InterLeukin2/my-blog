import styles from './page.module.css'
//import PostList from '@/app/posts/postList'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeToggle />
      <div className={styles.profile}>
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width={120}
          height={120}
          className={styles.avatar}
          priority
        />
        <h1>{siteConfig.author}</h1>
        <p>{siteConfig.description}</p>
      </div>
      <PostList />
    </main>
  )
}
