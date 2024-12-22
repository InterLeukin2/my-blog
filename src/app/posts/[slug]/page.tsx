import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import Head from 'next/head'

// 定义 PageProps 类型，params 是 Promise 类型，需要 await 解析
type PageProps = {
  params: Promise<{ slug: string }>  // params 是一个 Promise
}

export async function generateMetadata({ params }: PageProps) {
  // 等待 params 解析并获取 slug
  const { slug } = await params  // 使用 await 等待 params
  return {
    title: `Post - ${slug}`,
  }
}

export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts
    .filter((post) => post.published)  // 只包含已发布的文章
    .map((post) => ({
      slug: post.slug,
    }))
}

export default async function PostPage({ params }: PageProps) {
  // 等待 params 解析并获取 slug
  const { slug } = await params  // 使用 await 获取 slug

  if (slug === 'template') {
    notFound()  // 如果 slug 是 'template'，返回 404
  }

  return (
    <>
      <Head>
        <title>Post - {slug}</title>
      </Head>
      <PostContent slug={slug} />
    </>
  )
}

async function fetchPosts() {
  const posts = [
    { slug: 'first-post', published: true },
    { slug: 'second-post', published: true },
    { slug: 'MRO', published: true },
    { slug: 'template', published: false },
  ]
  return posts
}