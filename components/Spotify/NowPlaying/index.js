import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'
import { FaSpotify, FaPauseCircle } from 'react-icons/fa'
import MusicEqualizer from './MusicEqualizer'
import SongImage from './SongImage'
import Link from '@/components/Link'
import fetcher from '@/lib/fetcher'
export default function NowPlaying() {
  const { t } = useTranslation()
  const { data } = useSWR('/api/now-playing', fetcher)
  return (
    <div className="flex max-w-lg flex-wrap items-center justify-center space-x-2 transition-all sm:gap-2 sm:space-x-1 md:space-x-0">
      {data?.isPlaying && data?.songUrl && (
        <SongImage src={data.songImage} alt={`${data.title} - ${data.artist}`} size={20} />
      )}
      {data?.isPause && data?.songUrl && <FaPauseCircle className="text-spotify" />}
      {data?.isPlaying && data?.songUrl && <MusicEqualizer />}
      {!data?.isPlaying && !data?.isPause && !data?.songUrl && (
        <FaSpotify className="text-spotify" />
      )}
      {data?.songUrl ? (
        <Link
          className="truncate text-sm transition-all hover:text-spotify sm:text-sm"
          href={data.songUrl}
          title={data.title}
        >
          {data.title}
        </Link>
      ) : (
        <p className="flex text-sm text-secondary-500 dark:text-secondary-400">
          {t('common:not-playing')}
        </p>
      )}

      <span className=" flex text-sm text-secondary-500 dark:text-secondary-400">{'-'}</span>

      <p className='dark:text-secondary-400" flex flex-wrap truncate text-sm text-secondary-500 '>
        {data?.artist ?? 'Spotify'}
      </p>
    </div>
  )
}
