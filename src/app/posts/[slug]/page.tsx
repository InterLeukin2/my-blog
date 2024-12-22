import { notFound } from 'next/navigation'
import PostContent from './PostContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// 使用 Next.js 的内置类型
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