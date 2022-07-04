import Image from '@/components/Image'
export default function SongImage({ alt, src, size }) {
  return (
    <Image
      src={src}
      alt={alt}
      type="circle"
      circleSize="w-5 h-5"
      width={size}
      height={size}
      className="rounded-full"
    />
  )
}
