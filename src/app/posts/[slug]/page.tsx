import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// 定义生成静态参数的函数
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' }
  ]
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

// 页面组件
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 