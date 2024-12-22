import { notFound } from 'next/navigation'
import PostContent from './PostContent'

// 定义参数类型
type Params = {
  slug: string;
}

// 定义页面属性类型
type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostPage({ params, searchParams }: Props) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 