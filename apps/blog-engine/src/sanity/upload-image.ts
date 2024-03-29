import { type SanityImageAssetDocument } from '@sanity/client'
import { postClient } from './setup'

export const uploadImage = async (imageUrl: string): Promise<SanityImageAssetDocument> => {
  console.info(`Downloading image from Unsplash: ${imageUrl}`)
  const image = await fetch(imageUrl)
  console.info('Converting image to blob')
  const blob = await image.blob()

  console.info('Uploading image to Sanity')
  return await postClient.assets.upload('image', Buffer.from(await blob.arrayBuffer()))
}
