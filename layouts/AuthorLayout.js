import useTranslation from 'next-translate/useTranslation'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import CloudinaryImg from '@/components/CloudinaryImg'
import { PageSEO } from '@/components/SEO'
import Card from '@/components/Card'

export default function AuthorLayout({ children, frontMatter, availableLocales }) {
  const { name, occupation, company, email, twitter, instagram, github } = frontMatter
  const { t } = useTranslation()
  let avatarDynamic = `v1651370642/blog/avatars/${name.toLowerCase()}.jpg`
  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:about')} - ${name}`}
        description={`${t('SEO:author')} - ${name}`}
        availableLocales={availableLocales}
      />
      <div className="divide-y divide-transparent">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-secondary-900 dark:text-secondary-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('headerNavLinks:about')}
          </h1>
        </div>
        <div className="items-start">
          <div className="flex flex-col items-center rounded-2xl bg-secondary-500/10 p-2 text-center dark:bg-secondary-600/10 md:flex-row">
            <div>
              <Card onlyImg className="p-4">
                <CloudinaryImg id={avatarDynamic} alt={name} objectFit="cover" className="w-15 h-15" />
              </Card>
            </div>
            <h1 className="py-2 text-2xl font-bold leading-8 tracking-tight">{name}</h1>
            <div className="text-secondary-500 dark:text-secondary-400">{occupation}</div>
            <div className="text-secondary-500 dark:text-secondary-400">{company}</div>
            <div className="flex space-x-3 py-6 px-4 md:py-0 md:px-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
              <SocialIcon kind="github" href={github} size={5} />
              <SocialIcon kind="instagram" href={instagram} size={5} />
              <SocialIcon kind="twitter" href={twitter} size={5} />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark md:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
