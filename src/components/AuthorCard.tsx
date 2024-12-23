'use client'

import Image from 'next/image'
import styles from '@/styles/AuthorCard.module.css'

export default function AuthorCard() {
  // 获取当前时间
  const lastUpdated = new Date().toLocaleDateString('en-US', {
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
      <h3 className={styles.name}>jing</h3>
      <p className={styles.bio}>
        until Penguin happy
        <br />
        Dedicated to exploring AI and full-stack development.
      </p>
      <div className={styles.meta}>
        <p className={styles.updateTime}>
          last updated：{lastUpdated}
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