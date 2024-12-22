import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

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