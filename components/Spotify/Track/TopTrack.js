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
      {data.tracks.map((track, k) => (
        <Parallax
          key={k}
          y={20}
          visibleOpacity={1}
          hiddenOpacity={0}
          className="flex flex-wrap w-full md:w-1/2 px-4"
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
