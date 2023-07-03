import { postClient } from './setup'

export interface SavePostParams {
  title: string
  content: any // @TODO: figure out how to type this
  category: string
}

export const savePost = async(parans: SavePostParams) => {
  return postClient.create({
    _type: 'post',
    ...parans,
  })
}
