'use client'

import ThemeToggle from '@/components/ThemeToggle'
import AuthorCard from '@/components/AuthorCard'

export default function Home() {
  return (
    <main>
      <ThemeToggle />
      <AuthorCard />
    </main>
  )
}
