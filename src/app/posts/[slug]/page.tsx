import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

// 使用 Next.js 内部类型
type PageProps = {
  params: SearchParamsContext
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

export default async function PostPage({ params }: PageProps) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
}