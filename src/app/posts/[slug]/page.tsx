import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  return {
    title: `Post - ${resolvedParams.slug}`,
  }
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params)
  
  if (resolvedParams.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={resolvedParams.slug} />
} 