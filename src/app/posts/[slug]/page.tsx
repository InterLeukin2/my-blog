import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Post - ${params.slug}`,
  }
}

export default function PostPage({ params }: PageProps) {
  if (params.slug === 'template') {
    notFound()
  }
  
  return <PostContent slug={params.slug} />
} 