import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";
import TimeAgo from "@/components/TimeAgo";
import ReadTime from "@/components/ReadTime";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import Author from "@/components/Author";
import Image from "@/components/Image";
import { BlogSEO } from "@/components/SEO";
import formatDate from "@/lib/utils/formatDate";
import titleCase from "@/lib/utils/titleCase"
import ScrollTop from "@/components/ScrollTop";
import siteMetadata from "@/data/siteMetadata";

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`;

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  availableLocales,
  children,
}) {
  const { fileName, date, title, tags, readingTime, thumbnail } = frontMatter;
  const roundedRead = Math.round(readingTime);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const blogImage = `https://res.cloudinary.com/raf-ar/image/upload/v1650957837/blog/${tags[0]}.jpg`;
  return (
    <SectionContainer>
      <BlogSEO
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        availableLocales={availableLocales}
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        thumbImg={`_next/image?url=https://res.cloudinary.com/raf-ar/image/upload/v1650957837/blog/${tags[0]}.jpg&w=1080&q=100}`}
        {...frontMatter}
      />
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 pb-8 text-center">
              <dl>
                <dt className="sr-only">{t("common:pub")}</dt>
                <dd className="flex items-center justify-center divide-x-2 divide-gray-500 text-sm font-medium leading-6 text-gray-500 dark:divide-gray-400 dark:text-gray-400">
                  <TimeAgo datetime={date} className="px-2" locale={locale} />
                  <time className="px-2" dateTime={date}>
                    {formatDate(date, locale)}
                  </time>
                  <ReadTime
                    time={roundedRead}
                    className="hidden px-2 md:flex"
                  />
                </dd>
              </dl>
              <div className="space-y-4">
                <PageTitle className="py-2">{title}</PageTitle>

                <ReadTime
                  time={roundedRead}
                  className="flex items-center justify-center divide-gray-500 text-sm font-medium leading-6 text-gray-500 dark:divide-gray-400 dark:text-gray-400 md:hidden"
                />

                <Author detail={authorDetails} />
              </div>
            </div>
          </header>
          <div className=" container w-full">
            {thumbnail && (
              <div className="flex w-full justify-center">
                <Image
                  alt={`${title} - ${titleCase(`${tags[0]}`)}`}
                  src={blogImage}
                  width={900}
                  height={500}
                  className="rounded-lg"
                  objectFit="cover"
                  placeholder="blur"
                
                />
              </div>
            )}
            <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
              {children}
            </div>
            <div className="pt-6 pb-6 text-sm text-gray-700 hover:underline dark:text-gray-300 ">
              <Link
                className="flex items-center hover:text-primary-500"
                href={editUrl(fileName)}
              >
                <FaGithub size={20} className="mr-3" />
                {t("common:github")}
              </Link>
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
