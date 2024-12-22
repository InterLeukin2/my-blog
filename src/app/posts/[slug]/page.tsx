import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

export default async function PostPage({ params }: Props) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 