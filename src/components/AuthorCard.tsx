import Image from 'next/image'
import styles from '@/styles/AuthorCard.module.css'

export default function AuthorCard() {
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
      <p className={styles.bio}>个人简介：热爱技术，热爱分享，致力于成为一名优秀的开发者和算法工程师.</p>
      <div className={styles.social}>
        <a href="https://github.com/interleukin2" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {/* 添加其他社交链接 */}
      </div>
    </div>
  )
} 