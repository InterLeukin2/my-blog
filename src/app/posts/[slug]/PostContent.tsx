import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import styles from './post.module.css'
import { siteConfig } from '@/config/site'

const POSTS_DIR = join(process.cwd(), 'src', 'posts')

// 自定义图片组件的属性类型
interface CustomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  style?: React.CSSProperties
}

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

const components = {
  img: ({ src, alt = '', ...props }: CustomImageProps) => {
    const imageSrc = src.startsWith('/') ? src : `/images/${src}`
    return (
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={400}
          priority
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
          {...props}
        />
        {alt && <p className={styles.imageCaption}>{alt}</p>}
      </div>
    )
  },
  pre: ({ children, ...props }: CodeBlockProps) => (
    <pre className={styles.codeBlock} {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: CodeBlockProps) => (
    <code className={styles.inlineCode} {...props}>
      {children}
    </code>
  )
}

export default async function PostContent({ slug }: { slug: string }) {
  try {
    const fullPath = join(POSTS_DIR, `${slug}.mdx`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    if (data.published === false) {
      return null
    }
    
    return (
      <article className={styles.article}>
        <h1 className={styles.title}>{data.title || slug}</h1>
        <div className={styles.metadata}>
          <time className={styles.date}>
            {new Date(data.date || new Date()).toLocaleDateString('zh-CN')}
          </time>
          <span className={styles.author}>作者：{siteConfig.author}</span>
        </div>
        <div className={styles.content}>
          <MDXRemote 
            source={content} 
            components={components}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                format: 'mdx',
                remarkPlugins: [],
                rehypePlugins: [],
              }
            }}
          />
        </div>
      </article>
    )
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
} 