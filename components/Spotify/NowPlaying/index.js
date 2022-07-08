import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'
import { FaSpotify, FaPauseCircle } from 'react-icons/fa'
import MusicEqualizer from './MusicEqualizer'
import Image from '@/components/Image'
import Link from '@/components/Link'
import fetcher from '@/lib/fetcher'
export default function NowPlaying() {
  const { t } = useTranslation()
  const { data } = useSWR('/api/now-playing', fetcher)
  return (
    <div className="flex max-w-lg flex-wrap items-center justify-center space-x-2 transition-all sm:gap-2 sm:space-x-1 md:space-x-0">
      {data?.isPlaying && data?.songUrl && (
        <Image
          src={data.songImage}
          alt={`${data.title} - ${data.artist}`}
          width={20}
          height={20}
          className="rounded-full"
        />
      )}
      {data?.isPause && data?.songUrl && <FaPauseCircle className="text-spotify" />}
      {data?.isPlaying && data?.songUrl && <MusicEqualizer />}
      {!data?.isPlaying && !data?.isPause && !data?.songUrl && (
        <FaSpotify className="text-spotify" />
      )}
      {data?.songUrl ? (
        <Link
          className="hover:text-spotify-green truncate text-sm transition-all sm:text-sm"
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
