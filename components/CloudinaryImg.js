import { Image } from 'cloudinary-react'
export default function CloudinaryImg({ id, props }) {
  return <Image cloudName="raf-ar" publicId={id} alt="" {...props}  />
}
