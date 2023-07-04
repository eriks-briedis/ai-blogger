import Link from 'next/link'
import { SanityImage } from './sanity-image'

type Props = {
  title: string
  src: string
  slug?: any
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <SanityImage image={src} title={title} alt={title} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
