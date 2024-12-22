import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import styles from './post.module.css'

const POSTS_DIR = join(process.cwd(), 'src', 'posts')

interface ImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string;
  alt?: string;
}

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

const components = {
  img: ({ src, alt, ...props }: ImageProps) => {
    const imageSrc = src.startsWith('/') ? src : `/images/${src}`
    
    return (
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={alt || ''}
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
  pre: ({ children, ...props }: CodeProps) => (
    <pre className={styles.codeBlock} {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: CodeProps) => (
    <code className={styles.inlineCode} {...props}>
      {children}
    </code>
  )
}

async function getPost(slug: string) {
  try {
    const fullPath = join(POSTS_DIR, `${slug}.mdx`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    if (data.published === false) {
      return null
    }
    
    return {
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      author: siteConfig.author,
      content,
      published: data.published || false,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export default async function PostContent({ slug }: { slug: string }) {
  const post = await getPost(slug)
  
  if (!post) {
    return null
  }

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.metadata}>
        <time className={styles.date}>
          {new Date(post.date).toLocaleDateString('zh-CN')}
        </time>
        <span className={styles.author}>作者：{post.author}</span>
      </div>
      <div className={styles.content}>
        <MDXRemote 
          source={post.content} 
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
} 