import type Author from './author'

interface PostType {
  slug: {
    current: string
    type: 'slug'
  }
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: any[]
}

export default PostType
