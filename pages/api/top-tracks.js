import { getTopTracks } from '@/lib/spotify'
export default async function handler(req, res) {
  const response = await getTopTracks()
  const { items } = await response.json()
  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.album.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.album.external_urls.spotify,
    title: track.album.name,
    songImage: track.album.images[0].url,
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json({ tracks })
}
