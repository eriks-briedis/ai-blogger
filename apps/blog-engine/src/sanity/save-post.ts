import { postClient } from './setup'

export interface SavePostParams {
  title: string
  slug: any
  content: any // @TODO: figure out how to type this
  category: string
  coverImage: any
  ogImage: any
  date: string
}

export const savePost = async(parans: SavePostParams) => {
  return postClient.create({
    _type: 'post',
    ...parans,
  })
}
