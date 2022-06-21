import useSWR from 'swr'
import Track from './Track'
import NoTrack from './NoTrack'
import Parallax from '@/components/motion/Parallax'
import fetcher from '@/lib/fetcher'
export default function Tracks() {
  const { data } = useSWR('/api/top-tracks', fetcher)

  if (!data) {
    return <NoTrack />
  }
  return (
    <>
      {data.tracks.map((track) => (
        <Parallax
          key={track.songUrl}
          y={20}
          visibleOpacity={1}
          hiddenOpacity={0}
          className="w-full"
        >
          <Track
            title={track.title}
            image={track.songImage}
            url={track.songUrl}
            artist={track.artist}
          />
        </Parallax>
      ))}
    </>
  )
}
