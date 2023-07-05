import { postClient } from './setup'

export const deletePost = async (id: string) => {
  postClient.delete(id)
}
