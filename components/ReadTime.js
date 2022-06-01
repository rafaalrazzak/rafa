import useTranslation from 'next-translate/useTranslation'
import readingTime from 'reading-time'
export default function ReadTime({ className, containt }) {
  const time = readingTime(containt).minutes
  const roundTime = Math.round(time)
  const { t } = useTranslation()
  return (
    <span className={className}>
      {roundTime}{' '}
      {roundTime == 1
        ? `${t('common:minute')} ${t('common:to')} ${t('common:read')}`
        : `${t('common:minutes')} ${t('common:to')} ${t('common:read')}`}
    </span>
  )
}
