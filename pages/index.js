import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'
import { RiArticleLine } from 'react-icons/ri'
import Parallax from '@/components/motion/Parallax'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import TimeAgo from '@/components/TimeAgo'
import View from '@/components/View'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const Card = dynamic(() => import('@/components/Card'), { ssr: false })
const Track = dynamic(() => import('@/components/Spotify/Track'), { ssr: false })

const MAX_DISPLAY = 3

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="relative justify-center pb-12 pt-2 text-center xs:flex xs:flex-col sm:pb-14 sm:pt-3 ">
        <div className="h-screen w-full">
          <Hero />
        </div>
        <Parallax y={20}>
          <h1 className="py-3 text-4xl font-extrabold leading-relaxed tracking-tight text-secondary-900 dark:text-secondary-100 sm:text-4xl md:text-5xl md:leading-14 xl:text-6xl">
            {t('common:hi')} Rafa Al Razzak
          </h1>
          <p className="px-2 text-xl font-light leading-6 text-secondary-500 dark:text-secondary-400 sm:px-6 xl:px-0">
            {t('common:mini-bio')}
          </p>
        </Parallax>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-wrap pb-2">
          <Parallax y={25} className="flex flex-wrap">
            <Card
              title={t('common:learning')}
              description={t('learning:description')}
              href={'/learning'}
              className="py-4 md:px-4"
            />

            <Card
              title={t('common:about')}
              description={t('common:about-description')}
              href={'/about'}
              className="py-4 md:px-4"
            />
          </Parallax>

          <div className="w-full divide-y divide-transparent py-6 md:px-4">
            <Parallax y="15">
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {t('common:latest-article')}
              </h1>
            </Parallax>

            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <Parallax
                  y={15}
                  key={slug}
                  className="group w-full rounded-xl transition-all duration-300 ease-in-out hover:bg-secondary-300/30 dark:hover:bg-secondary-600/30"
                >
                  <div className="w-full transition-all duration-1000 ease-in-out group-hover:p-4">
                    <ul>
                      <li className="py-4">
                        <article>
                          <div className="space-y-2 xl:grid xl:grid-cols-3 xl:items-baseline xl:space-y-0">
                            <dl>
                              <dt className="sr-only">{t('common:pub')}</dt>
                              <dd className="flex flex-col gap-1 text-base font-medium leading-6 text-secondary-500 dark:text-secondary-400">
                                <View locale={locale} value={6666} />
                                <TimeAgo
                                  datetime={date}
                                  locale={locale}
                                  className="text-primary-500"
                                />
                                <time className="text-sm" dateTime={date}>
                                  {formatDate(date, locale)}
                                </time>
                              </dd>
                            </dl>

                            <div className="space-y-5 xl:col-span-2">
                              <div className="space-y-6">
                                <div className="flex flex-col xs:w-full xs:justify-center">
                                  <h1 className="text-xl font-bold leading-8 tracking-tight">
                                    <Link
                                      href={`/blog/${slug}`}
                                      className="text-secondary-900 dark:text-secondary-100"
                                    >
                                      {title}
                                    </Link>
                                  </h1>
                                  <div className="flex flex-wrap">
                                    {tags.map((tag) => (
                                      <Tag key={tag} text={tag} />
                                    ))}
                                  </div>
                                </div>

                                <div className="prose text-base text-secondary-500 dark:text-secondary-400">
                                  {summary}
                                </div>
                              </div>
                              <div className="text-sm font-medium leading-6">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                  aria-label={`Read "${title}"`}
                                >
                                  {t('common:more')} &rarr;
                                </Link>
                              </div>
                            </div>
                          </div>
                        </article>
                      </li>
                    </ul>
                  </div>
                </Parallax>
              )
            })}
          </div>
        </div>
        {posts.length >= 3 && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              <div className="flex items-center space-x-2">
                <RiArticleLine /> <span>{t('common:all')}</span>
              </div>
            </Link>
          </div>
        )}
        <Parallax y={10} visibleOpacity={1} hiddenOpacity={1}>
          <h1 className=" flex justify-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            My <span className="mx-1 text-spotify">Spotify</span> Top Song
          </h1>
        </Parallax>
        <Track />
      </div>
    </>
  )
}
