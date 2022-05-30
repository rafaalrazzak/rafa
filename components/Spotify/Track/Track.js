import Image from '@/components/Image'
import Link from '@/components/Link'
export default function Track({ title, image, url, artist }) {
  return (
    <div className="group relative my-4 flex h-auto w-full flex-col justify-center overflow-hidden rounded-lg border-b bg-white/30 shadow-sm filter backdrop-blur-md transition-colors duration-500 ease-linear hover:bg-spotify/10 hover:text-white dark:border-gray-600/50 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link href={url}>
        <div className="flex h-full w-full justify-start ">
          <div className="w-38 flex xs:hidden">
            <Image
              src={image}
              alt={`${title} - ${artist}`}
              type="topTrack"
              width="150"
              height="150"
              className="transition-all duration-300 group-hover:scale-110"
              objectFit="cover"
            />
          </div>
          <div className="relative flex w-full flex-col p-4 leading-relaxed">
            <h5 className="pb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">{artist}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
