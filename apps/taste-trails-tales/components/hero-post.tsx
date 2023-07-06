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
  slug: {
    current: string
    type: 'slug'
  }
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug?.current} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
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
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          { author && <Avatar name={author.name} picture={author.picture} /> }
        </div>
      </div>
    </section>
  )
}

export default HeroPost
