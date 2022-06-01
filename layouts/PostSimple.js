import { useQuery } from '@apollo/client'
import MDX from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
// Rehype packages
import TimeAgo from '@/components/TimeAgo'
import ReadTime from '@/components/ReadTime'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Author from '@/components/Author'
import ScrollTop from '@/components/ScrollTop'
import { BLOG } from '@/lib/gql/fetch'
import formatDate from '@/lib/utils/formatDate'

export default function GqlBlog() {
  const { loading, error, data } = useQuery(BLOG)
  const blogs = data?.blogs

  return (
    <SectionContainer>
      {blogs?.map(({ title, datePublished, authors, containt, id, slug }) => (
        <div key={id}>
          <ScrollTop />
          <article>
            <div>
              <header>
                <div className="space-y-1 pb-8 text-center">
                  <dl>
                    <dt className="sr-only">{datePublished}</dt>
                    <dd className="flex items-center justify-center divide-x-2 divide-gray-500 text-sm font-medium leading-6 text-gray-500 dark:divide-gray-400 dark:text-gray-400">
                      <TimeAgo datetime={datePublished} className="px-2" />
                      <time className="px-2" dateTime={datePublished}>
                        {formatDate(datePublished)}
                      </time>
                      <ReadTime containt={containt} className="hidden px-2 md:flex" />
                    </dd>
                  </dl>
                  <div className="space-y-2">
                    <PageTitle className="py-2">{title}</PageTitle>
                    {authors.map((author) => (
                      <Author detail={author} />
                    ))}
                  </div>
                </div>
              </header>
              <div className=" container w-full">
                <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                  <MDX children={containt} remarkPlugins={[remarkGfm, rehypePrismPlus]} />
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </SectionContainer>
  )
}
