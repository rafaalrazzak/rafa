import NextImage from 'next/image'
import { useState } from 'react'
import { convertImage, toBase64 } from '@/lib/utils/imageBlur'
// eslint-disable-next-line jsx-a11y/alt-text
export default function Image({ type, circleSize, src, width, height, ...rest }) {
  const [isReady, setIsReady] = useState(false)
  function ready() {
    setTimeout(setReady, 3000)
  }

  function setReady() {
    setIsReady(true)
  }

  ready()
  return (
    <>
      {isReady ? (
        <NextImage
          src={src}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(src, width, height))}`}
          {...rest}
        />
      ) : (
        <div
          className={`${type == 'topTrack' ? 'rounded-l-lg' : 'rounded-lg '} ${
            type == 'circle' ? `${circleSize} rounded-full` : 'h-full w-full '
          }  animate-pulse bg-secondary-200`}
        ></div>
      )}
    </>
  )
}
