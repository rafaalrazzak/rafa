import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Instagram from './instagram.svg'
import Twitter from './twitter.svg'
import ExternalLink from './external-link.svg'
// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  twitter: Twitter,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  external_link: ExternalLink,
}

const SocialIcon = ({ kind, name, href, size = 8, className }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className={`${className} text-sm text-gray-500 transition hover:text-gray-600`}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{name ?? kind}</span>
      <SocialSvg
        className={`${
          kind != 'external_link'
            ? `fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 w-${size}`
            : ` text-white w-${size}`
        }`}
      />
    </a>
  )
}

export default SocialIcon
