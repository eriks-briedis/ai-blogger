import { Router } from 'express';
import { createPost } from './openai';
import { searchPhotos } from './unsplash/search-photos';
import { toKebabCase } from './helpers';

export const defaultRoute = Router();

defaultRoute.get('/', async (req, res) => {
  const chatCompletion = await createPost({
    title: 'Top 5 Hidden Gems in Germany',
  });

  const postContent = chatCompletion?.data.choices[0].message?.content

  if (!postContent) {
    res.send('Failed to generate post');
    return;
  }

  const regex = /<(h1|h2)>(.*?)<\/(h1|h2)>/g;
  const matches = postContent.match(regex);
  const headers = (matches || []).map((match) => match.replace(/<\/?(h1|h2)>/g, ''));

  const images = await Promise.all(headers.map(async (header) => {
    const photos = await searchPhotos(`${header}`);
    const url = photos.response?.results[0].urls.regular
    if (url) {
      return {
        header: `${toKebabCase(header)}-image`,
        url,
      }
    }
  }));

  const postContentWithImages = images.reduce((acc, image) => {
    if (!image?.header) {
      return acc
    }

    if (acc.includes(`[${image?.header}-image]`)) {
      return acc.replace(`[${image?.header}]`, image?.url || '');
    }

    if (acc.includes(`{${image?.header}-image}`)) {
      return acc.replace(`[${image?.header}]`, image?.url || '');
    }

    return acc
  }, postContent)

  res.send(postContentWithImages);
});

defaultRoute.get('/photos', async (req, res) => {
  const photos = await searchPhotos('Hidden Gems in Germany')

  res.send(`${JSON.stringify(photos)}`);
})
