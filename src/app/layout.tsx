import './globals.css'
import SiteTitle from '@/components/SiteTitle'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SiteTitle />
        {children}
      </body>
    </html>
  )
}
