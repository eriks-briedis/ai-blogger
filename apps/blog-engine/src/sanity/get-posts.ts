import { postClient } from './setup';

export const getPosts = async () => {
  return postClient.fetch('*[_type == "post"]')
};
