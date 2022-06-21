import { useRouter } from 'next/router'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NowPlaying from '@/components/Spotify/NowPlaying'

export default function Footer() {
  const { locale } = useRouter()
  return (
    <footer>
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="mb-4 flex space-x-3 px-4 pt-6 md:px-6 md:pt-0">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon
            kind="instagram"
            href={`https://instagram.com/${siteMetadata.instagram}`}
            size={5}
          />
          <SocialIcon
            kind="twitter"
            href={`https://twitter.com/${siteMetadata.twitter}`}
            size={5}
          />
        </div>
        <div className="mb-3 flex">
          <NowPlaying />
        </div>
        <div className="mb-8 flex flex-row space-x-2 text-sm text-secondary-500 dark:text-secondary-400 xs:space-x-1 xs:text-xs">
          <div>{siteMetadata.author}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" aria-label={siteMetadata.headerTitle[locale]}>
            {siteMetadata.headerTitle[locale]}
          </Link>
        </div>
      </div>
    </footer>
  )
}
