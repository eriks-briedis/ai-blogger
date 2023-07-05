import { unsplash } from './setup'

export const findPhoto = async (
  query: string,
) => {
  const response = await unsplash.search.getPhotos({
    query,
    orientation: 'landscape',
  })

  if (response.status !== 200) {
    throw new Error('Failed to search photos')
  }

  const photos = response.response?.results || []

  return photos[0]
}

export const getPhotoUrls = async (
  query: string,
  sizes: string[] = ['regular', 'small'],
): Promise<Record<string, string>> => {
  const photo = await findPhoto(query)

  return sizes.reduce((acc, size) => {
    const url = photo.urls[size as unknown as keyof typeof photo.urls]
    if (!url) {
      return acc
    }

    return {
      ...acc,
      [size]: url,
    }
  }, {})
}
