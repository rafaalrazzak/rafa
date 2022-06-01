import useTranslation from 'next-translate/useTranslation'
import { FaTwitter } from 'react-icons/fa'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { convertImage, toBase64 } from '@/lib/utils/imageBlur'

export default function Author({ detail }) {
  const { name, avatar, id, twitter } = detail
  console.log(detail)
  const { t } = useTranslation()
  return (
    <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-4">
      <li className="flex items-center justify-center space-x-2" key={id}>
        <Image
          src={avatar.url}
          width="36px"
          height="36px"
          alt={name}
          type="circle"
          circleSize="w-9 h-9"
          className="rounded-full"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(`${avatar.url}`, 10, 10)
          )}`}
        />
        <dl className="whitespace-nowrap text-sm font-medium leading-5">
          <dt className="sr-only">{name}</dt>
          <dd>
            <Link
              className="text-secondary-900 transition hover:text-primary-500 dark:text-secondary-100 dark:hover:text-primary-400"
              href="/about"
            >
              {name}
            </Link>
          </dd>
          <dt className="sr-only">Twitter</dt>
          <dd>
            {twitter && (
              <Link
                href={`https://twitter.com/${twitter}`}
                className="flex items-center text-xs text-primary-500 transition hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FaTwitter size={15} className="mr-1" />
                {`@${twitter}`}
              </Link>
            )}
          </dd>
        </dl>
      </li>
    </ul>
  )
}
