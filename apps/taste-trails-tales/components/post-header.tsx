import type Author from '../interfaces/author'
import { SanityImage } from './sanity-image'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'

interface Props {
  title: string
  coverImage: any
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        { author && <Avatar name={author.name} picture={author.picture} /> }
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <SanityImage image={coverImage} alt={title} title={title} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          { author && <Avatar name={author.name} picture={author.picture} /> }
        </div>
        {date && <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>}
      </div>
    </>
  )
}

export default PostHeader
