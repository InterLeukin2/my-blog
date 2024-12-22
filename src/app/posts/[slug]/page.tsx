import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import Head from 'next/head'

// 定义 PageProps 类型
type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  // 在生成元数据时等待 params
  const { slug } = await params  // 异步解构 params
  return {
    title: `Post - ${slug}`,
  }
}

// 生成所有已发布文章的静态参数
export async function generateStaticParams() {
  const posts = await fetchPosts()  // 获取文章列表
  return posts
    .filter((post) => post.published)  // 只包含已发布的文章
    .map((post) => ({
      slug: post.slug,  // 返回每篇文章的 slug
    }))
}

export default async function PostPage({ params }: PageProps) {
  // 在使用 params 之前确保它被异步解析
  const { slug } = await params  // 等待 params 解析并获取 slug

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

// 模拟获取包含 slug 和发布状态的文章
async function fetchPosts() {
  const posts = [
    { slug: 'first-post', published: true },
    { slug: 'second-post', published: true },
    { slug: 'MRO', published: true },  // 添加 MRO 文章
    { slug: 'template', published: false },  // 一个未发布的文章
    // 更多文章...
  ]
  return posts
}
