import useTranslation from 'next-translate/useTranslation'
import { FaTwitter } from 'react-icons/fa'
import CloudinaryImg from '@/components/CloudinaryImg'
import Link from '@/components/Link'

export default function Author({ detail }) {
  const { t } = useTranslation()
  return (
    <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-4">
      {detail.map((author) => (
        <li className="flex items-center justify-center space-x-2" key={author.name}>
          <div className="w-8 overflow-hidden rounded-full">
            <CloudinaryImg
              id={`v1651370642/blog/avatars/${author.name.toLowerCase()}.jpg`}
              alt={author.name}
            />
          </div>
          <dl className="whitespace-nowrap text-sm font-medium leading-5">
            <dt className="sr-only">{t('common:name')}</dt>
            <dd>
              <h3 className="text-secondary-900 transition dark:text-secondary-100">
                {author.name}
              </h3>
            </dd>
            <dt className="sr-only">Twitter</dt>
            <dd>
              {author.twitter && (
                <Link
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center text-xs text-primary-500 transition hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <FaTwitter size={15} className="mr-1" />
                  {`@${author.twitter}`}
                </Link>
              )}
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}
