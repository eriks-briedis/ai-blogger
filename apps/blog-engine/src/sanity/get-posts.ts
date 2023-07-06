import { postClient } from './setup'

export const getPosts = async () => {
  return await postClient.fetch('*[_type == "post"]')
}
