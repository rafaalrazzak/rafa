import Image from "@/components/Image";
import Link from "@/components/Link";
import { convertImage, toBase64 } from "@/lib/utils/imageBlur";

export default function Track({ title, image, alt }) {
  return (
    <div className="group relative my-4 flex h-auto w-full flex-col justify-center overflow-hidden rounded-lg border-b bg-white/30 shadow-sm filter backdrop-blur-md transition-colors duration-500 ease-linear hover:bg-spotify-green/10 hover:text-white dark:border-gray-600/50 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link href={track.songUrl}>
        <div className="flex h-full w-full justify-start ">
          <div className="flex w-40 xs:hidden">
            <Image
              alt={title}
              placeholder="blur"
              src={image}
              alt={alt}
              type="topTrack"
              width="160"
              height="160"
              objectFit="cover"
              className=" transiton w-40 duration-500 group-hover:scale-110"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                convertImage({ image }, 10, 10)
              )}`}
            />
          </div>
          <div className="relative flex w-full flex-col p-4 leading-relaxed">
            <h5 className="text-md pb-2 font-bold tracking-tight text-gray-900 dark:text-white md:text-xl">
              {track.title}
            </h5>
            <p className="md:text-md text-sm text-gray-700 dark:text-gray-400">
              {track.artist}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
