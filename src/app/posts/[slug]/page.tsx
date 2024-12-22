import { notFound } from 'next/navigation'
import PostContent from './PostContent'

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostPage({ params }: PageProps) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 