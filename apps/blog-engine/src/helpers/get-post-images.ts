import { findPhoto } from '../unsplash/search-photos';
import { getPostHeaders } from './get-post-headers';
import { PostImage } from './insert-images';

export const getPostImages = async (postContent: string): Promise<PostImage[]> => {
  const headers = getPostHeaders(postContent)
  const images = await Promise.all(headers.map(async (header): Promise<PostImage | undefined> => {
    const photo = await findPhoto(`${header}`);

    if (photo) {
      return {
        header,
        url: photo.urls.regular,
        authorPorfolioUrl: photo.user.links.html || undefined,
        authorName: photo.user.name,
      }
    }
  }));

  return images.filter(Boolean) as PostImage[];
};
