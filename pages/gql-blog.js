import { useQuery } from '@apollo/client'
import MDX from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import TimeAgo from '@/components/TimeAgo'
import ReadTime from '@/components/ReadTime'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Author from '@/components/Author'
import Image from '@/components/Image'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { BLOG } from '@/lib/gql/fetch'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

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

export default function GqlBlog() {
  const { loading, error, data } = useQuery(BLOG)
  const blogs = data?.blogs
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
        {blogs?.map(({ title, datePublished, authors, containt, id, slug, thumbnail, category }) => (
          <div key={id}>
            <div
              className={`${
                isTop ? 'mt-0' : 'mt-12'
              } pb-6 transition-all duration-700 xl:border-b xl:border-gray-200 xl:dark:border-gray-700`}
            >
              <dt className="sr-only">Author</dt>
              {authors.map((author) => (
            <dd key={author.id}>
              <Author detail={author} />
            </dd>
        ))}
            </div>
            <div className="leading-5xl:col-start-1 divide-transparent text-sm font-medium xl:row-start-2 xl:divide-y ">
              {category && (
                <div className="xl:pt-4">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {category.map((tag) => (
                      <Tag key={tag} text={tag}/>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 pt-4"
            >
              &larr; {t('common:back')}
            </Link>
          </div>
        ))}
      </div>
    )
  }

  return (
    <SectionContainer>
      {blogs?.map(({ title, datePublished, authors, containt, id, slug, thumbnail, category }) => (
        <div key={id}>
          <BlogSEO
            title={`${title}`}
            url={`${siteMetadata.siteUrl}/blog/${slug}`}
            authorDetails={authors}
            thumbImg={thumbnail.url}
            date={datePublished}
          />
          <article>
            <div className="w-full divide-transparent xl:divide-y">
              <header className="pt-6 xl:pb-6">
                <div className="flex justify-center space-y-1 text-center">
                  <dl className="space-y-10">
                    <dt className="sr-only">{t('common:pub')}</dt>
                    <dd className="flex items-center justify-center divide-x-2 divide-gray-500 text-sm font-medium leading-6 text-gray-500 dark:divide-gray-400 dark:text-gray-400">
                      <TimeAgo datetime={datePublished} className="px-2" locale={locale} />
                      <time className="px-2" dateTime={datePublished}>
                        {formatDate(datePublished, locale)}
                      </time>
                      <ReadTime containt={containt} className="hidden px-2 md:flex" />
                    </dd>
                  </dl>
                </div>
                <div className="text-center">
                  <PageTitle className="py-2">{title}</PageTitle>
                  <ReadTime
                    containt={containt}
                    className="dark:text-gray-40 flex items-center justify-center divide-x-2 divide-gray-500 text-sm font-medium leading-6 text-gray-500 dark:divide-gray-400 md:hidden"
                  />
                </div>
              </header>
              <div
                className="divide-y divide-transparent pb-8 xl:relative xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
                style={{ gridTemplateRows: 'auto 1fr' }}
              >
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="pt-6 pb-10 xl:hidden xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700"
                  >
                    <dt className="sr-only">{t('common:authors')}</dt>
                    <dd>
                      <Author detail={author} />
                    </dd>
                  </div>
                ))}
                <SideBar />

                <div className=" divide-y divide-transparent xl:col-span-3 xl:row-span-2 xl:pb-0">
                  {thumbnail && (
                    <div className="flex w-full justify-center">
                      <Image
                        alt={title}
                        width="900"
                        height="500"
                        src={thumbnail.url}
                        className="rounded-lg"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                    <MDX children={containt} remarkPlugins={[remarkGfm, rehypePrismPlus]} />
                  </div>
                </div>
                {/* <footer className="flex-wrap xl:hidden">
                  <div className="leading-5xl col-start-1 divide-transparent text-sm font-medium">
                    {category && (
                      <div className="pt-4 xl:pt-8">
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Tags
                        </h2>
                        <div className="flex flex-wrap">
                          {category.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}

                    {(next || prev) && (
                      <div className="flex justify-between py-4">
                        {prev && (
                          <div>
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              {t('common:preva')}
                            </h2>
                            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                              <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && (
                          <div className="items-end text-right">
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
                </footer> */}
              </div>
            </div>
          </article>
        </div>
      ))}
    </SectionContainer>
  )
}
