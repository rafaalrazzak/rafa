import { useQuery } from '@apollo/client'
import Image from '@/components/Image'
import { AUTHOR } from '@/lib/gql/fetch'

export default function Author() {
  const { loading, error, data } = useQuery(AUTHOR)
  const author = data?.authors[0]
  const avatar = author?.avatar?.url
  console.log(author)
  return (
    <>
      {avatar && <Image src={avatar} width={100} height={100} />}
      <h1>{loading ? 'loading...' : author?.name}</h1>
    </>
  )
}
