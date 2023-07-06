import { postClient } from './setup'

export const deletePost = async (id: string) => {
  await postClient.delete(id)
}
