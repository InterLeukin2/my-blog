import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// 使用 Next.js 的内置类型
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

// 页面组件
export default function PostPage(props: Props) {
  const { params } = props
  
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 