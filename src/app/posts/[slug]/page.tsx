import { notFound } from 'next/navigation'
import PostContent from './PostContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(params)
  
  if (resolvedParams.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={resolvedParams.slug} />
} 