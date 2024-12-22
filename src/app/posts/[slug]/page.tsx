import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: { slug: string }
}

// 添加元数据生成函数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

// 页面组件
export default function PostPage({ params }: Props) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 