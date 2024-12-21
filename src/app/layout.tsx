import { ThemeProvider } from '@/context/ThemeContext'
import '@/styles/globals.css'

export const metadata = {
  title: 'IL-42',
  description: 'have a good day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
