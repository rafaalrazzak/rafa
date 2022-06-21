import useTranslation from 'next-translate/useTranslation'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import ProjectCard from '@/components/ProjectCard'
import { PageSEO } from '@/components/SEO'

export async function getStaticProps({ locale, locales, data }) {
  const data = projectsData.map((x) => {
    return x
  })
  return { props: { locale, availableLocales: locales, data } }
}

export default function Projects({ locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:projects')} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-secondary-900 dark:text-secondary-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('projects:title')}
          </h1>
        </div>
        <div className="container w-full py-12">
          <ProjectCard
            key={data.title}
            title={data.title}
            description={data.description}
            image={`https://res.cloudinary.com/raf-ar/image/upload/v1651409847/blog/projects/${data.title.toLowerCase()}.jpg`}
            link={data.link}
          />
        </div>
      </div>
    </>
  )
}
