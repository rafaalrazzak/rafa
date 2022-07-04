import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { FaGithub } from 'react-icons/fa'
// import TimeAgo from '@/components/TimeAgo'
import ReadTime from '@/components/ReadTime'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Author from '@/components/Author'
import CloudinaryImg from '@/components/CloudinaryImg'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import titleCase from '@/lib/utils/titleCase'
import View from '@/components/View'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 255)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  availableLocales,
  children,
}) {
  const { slug, fileName, date, title, tags, readingTime, thumbnail } = frontMatter
  const blogImage = `v1650957837/blog/${tags[0]}.jpg`
  const roundedRead = Math.round(readingTime)
  const { locale } = useRouter()
  const { t } = useTranslation()
  function SideBar() {
    const isTop = useIsScrollTop()
    return (
      <div
        className={`${
          isTop ? 'xl:top-0 xl:flex xl:flex-col ' : 'xl:sticky xl:top-12 xl:flex xl:flex-col'
        } hidden`}
      >
        <div
          className={`${
            isTop ? 'mt-0' : 'mt-12'
          } pb-6 transition-all duration-700 xl:border-b xl:border-secondary-200 xl:dark:border-secondary-700`}
        >
          <dt className="sr-only">{t('common:authors')}</dt>
          <dd>
            <Author detail={authorDetails} />
          </dd>
        </div>
        <div className="leading-5xl:col-start-1 divide-transparent text-sm font-medium xl:row-start-2 xl:divide-y">
          {tags && (
            <div className="xl:pt-4">
              <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          )}
          {(next || prev) && (
            <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
              {prev && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                    {t('common:preva')}
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                    {t('common:nexta')}
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          &larr; {t('common:back')}
        </Link>
      </div>
    )
  }

  return (
    <SectionContainer>
      <BlogSEO
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        availableLocales={availableLocales}
        thumbImg={`/_next/image?url=https://res.cloudinary.com/raf-ar/image/upload/v1650957837/blog/${tags[0]}.jpg&w=1080&q=100`}
        {...frontMatter}
      />
      <article>
        <div className="divide-transparent xl:divide-y">
          <header className="pt-6 xl:pb-6">
            <div className="flex justify-center space-y-1 text-center">
              <dl>
                <dt className="sr-only">{t('common:pub')}</dt>
                <dd className="flex items-center justify-center divide-x-2 divide-secondary-500 text-sm leading-6 text-secondary-500 dark:divide-secondary-400 dark:text-secondary-400">
                  {/* <TimeAgo datetime={date} className="px-2" locale={locale} /> */}
                  <View locale={locale} value={666} className="px-2" />
                  <time className="px-2" dateTime={date}>
                    {formatDate(date, locale)}
                  </time>
                  <ReadTime time={roundedRead} className="hidden px-2 md:flex" />
                </dd>
              </dl>
            </div>
            <div className="text-center">
              <PageTitle className="py-2">{title}</PageTitle>
              <ReadTime
                time={roundedRead}
                className="dark:text-secondary-40 flex items-center justify-center divide-x-2 divide-secondary-500 text-sm font-medium leading-6 text-secondary-500 dark:divide-secondary-400 md:hidden"
              />
            </div>
          </header>
          <div
            className="divide-y divide-transparent pb-8 xl:relative xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="pt-6 pb-10 xl:hidden xl:border-b xl:border-secondary-200 xl:pt-11 xl:dark:border-secondary-700">
              <dt className="sr-only">{t('common:authors')}</dt>
              <dd>
                <Author detail={authorDetails} />
              </dd>
            </div>
            <SideBar />

            <div className="divide-y divide-transparent xl:col-span-3 xl:row-span-2 xl:pb-0">
              {thumbnail && (
                <div className="flex w-full justify-center overflow-hidden rounded-xl">
                  <CloudinaryImg
                    alt={`${title} - ${titleCase(`${tags[0]}`)}`}
                    id={blogImage}
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="prose pt-10 pb-8 dark:prose-dark">{children}</div>
              <div className="inline-flex items-center pt-6 pb-6 text-sm text-secondary-700 dark:text-secondary-300">
                <Link href={editUrl(fileName)} className="flex space-x-2 hover:text-primary-500">
                  <FaGithub size={20} />
                  <span>{t('common:github')}</span>
                </Link>
              </div>
            </div>
            <footer className="flex-wrap xl:hidden">
              <div className="leading-5xl col-start-1 divide-transparent text-sm font-medium">
                {tags && (
                  <div className="pt-4 xl:pt-8">
                    <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}

                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                          {t('common:preva')}
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div className="items-end text-right">
                        <h2 className="text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
                          {t('common:nexta')}
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {t('common:back')}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
