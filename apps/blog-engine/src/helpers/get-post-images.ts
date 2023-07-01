import { searchPhotos } from '../unsplash/search-photos';
import { PostImage } from './insert-images';

export const getPostImages = async (headers: string[]): Promise<PostImage[]> => {
  const images = await Promise.all(headers.map(async (header): Promise<PostImage | undefined> => {
    const photos = await searchPhotos(`${header}`);
    const photo = photos.response?.results[0]
    if (photo) {
      return {
        header,
        url: photo.urls.regular,
        authorPorfolioUrl: photo.user.portfolio_url || undefined,
        authorName: photo.user.name,
      }
    }
  }));

  return images.filter(Boolean) as PostImage[];
};
