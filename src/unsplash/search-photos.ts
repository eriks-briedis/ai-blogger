import { unsplash } from './setup'

export const searchPhotos = async (query: string) => {
  return unsplash.search.getPhotos({
    query,
    orientation: 'landscape',
  })
}
