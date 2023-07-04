import dotenv from 'dotenv';
import SanityClient from 'next-sanity-client';
import { join } from 'path';

dotenv.config();

export const sanityClient = new SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  queries: {
    getPostsQuery: '*[_type == "post"]',
    getPostBySlugQuery: '*[_type == "post" && slug.current == $slug][0]',
  }
});

export const getPosts = sanityClient.createApiUtil<any[]>('getPostsQuery')
export const getPost = sanityClient.createApiUtil<any[]>('getPostBySlugQuery')

const postsDirectory = join(process.cwd(), '_posts')

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const post = await getPost({ slug })

  console.log(post)

  return post
}

export async function getAllPosts(fields: string[] = []) {
  const posts = await getPosts()

  return posts
}
