import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

interface Props {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug?: {
    current: string
    type: 'slug'
  }
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug?.current} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug?.current}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      {!!date && <div className="mb-4 md:mb-0 text-lg">
        <DateFormatter dateString={date} />
      </div>}
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      { author && <Avatar name={author.name} picture={author.picture} /> }
    </div>
  )
}

export default PostPreview
