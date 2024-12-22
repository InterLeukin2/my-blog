import { siteConfig } from '@/config/site'
import styles from '../app/globals.css'

export default function SiteTitle() {
  return (
    <div className="site-title">
      {siteConfig.title}
    </div>
  )
} 