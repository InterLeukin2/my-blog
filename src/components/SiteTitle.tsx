import { siteConfig } from '@/config/site'

export default function SiteTitle() {
  return (
    <div className="site-title">
      {siteConfig.title}
    </div>
  )
} 