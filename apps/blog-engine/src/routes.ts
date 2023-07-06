import { Router } from 'express'
import { generatePostTitleInCategory } from './data/post-titles'
import { getPostImages, insertImages, slugify } from './helpers'
import { createPost } from './openai'
import { convertPostContent, savePost } from './sanity'
import { getPosts } from './sanity/get-posts'
import { findPhoto, getPhotoUrls } from './unsplash/search-photos'
import { uploadImage } from './sanity/upload-image'

export const defaultRoute = Router()

defaultRoute.get('/', async (req, res) => {
  console.info('Generating post title...')
  const title = generatePostTitleInCategory('travel')
  console.info(`Generated post title: ${title}`)

  console.info('Generating post content...')
  const chatCompletion = await createPost({
    title,
    length: 1000,
  })

  const postContent = chatCompletion?.data.choices[0].message?.content
  if (!postContent) {
    res.send('Failed to generate post')
    return
  }

  console.info('Post content generated')
  console.info('Looking for post images...')

  const coverImages = await getPhotoUrls(title)
  const images = await getPostImages(postContent)
  const formattedPostContent = await insertImages(postContent, images)

  console.info(formattedPostContent)

  console.info('Uploading cover image to Sanity...')
  const coverImageAsset = await uploadImage(coverImages.regular)
  console.info('Uploading OG image to Sanity...')
  const ogImageAsset = await uploadImage(coverImages.small)

  console.info('Saving post to Sanity...')
  const post = await savePost({
    title,
    slug: {
      type: 'slug',
      current: slugify(title),
    },
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: coverImageAsset._id,
      },
    },
    ogImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: ogImageAsset._id,
      },
    },
    content: convertPostContent(formattedPostContent),
    category: 'travel',
    date: new Date().toISOString(),
  })
  console.info('Post saved to Sanity')
  res.json(post)
})

defaultRoute.get('/photos', async (req, res) => {
  const photos = await findPhoto('Hidden Gems in Germany')

  res.json(photos)
})

defaultRoute.get('/posts', async (req, res) => {
  const posts = await getPosts()

  res.json(posts)
})
