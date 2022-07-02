import Image from '@/components/Image'
import Link from '@/components/Link'
export default function Track({ title, image, url, artist }) {
  return (
    <div className="group relative my-4 flex h-auto w-full flex-col justify-center overflow-hidden rounded-xl border-b bg-white/30 shadow-sm filter backdrop-blur-md transition-all duration-500 ease-linear hover:bg-secondary-400/10 hover:text-white hover:shadow-xl hover:shadow-spotify/10 dark:border-gray-600/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/50">
      <Link href={url}>
        <div className="flex h-full w-full justify-start ">
          <div className="flex w-32 xs:hidden">
            <Image
              src={image}
              alt={`${title} - ${artist}`}
              width="128"
              height="128"
              className="object-cover transition-all duration-300 group-hover:scale-110"
            />
          </div>
          <div className="relative flex w-full flex-col p-4 leading-relaxed">
            <h1 className="pb-2 font-bold tracking-tight text-secondary-900 transition-all duration-500 group-hover:text-spotify dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-secondary-700 dark:text-secondary-400">{artist}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
