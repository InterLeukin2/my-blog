'use client'

import Image from 'next/image'
import styles from '@/styles/AuthorCard.module.css'

export default function AuthorCard() {
  const lastUpdated = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image
          src="/images/avatar.png"
          alt="作者头像"
          width={150}
          height={150}
          priority
        />
      </div>
      <h3 className={styles.name}>Jing</h3>
      <p className={styles.bio}>
        致力于探索 AI 与全栈开发
      </p>
      <div className={styles.meta}>
        <p className={styles.updateTime}>
          最后更新：{lastUpdated}
        </p>
      </div>
      <div className={styles.social}>
        <a 
          href="https://github.com/interleukin2" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  )
} 