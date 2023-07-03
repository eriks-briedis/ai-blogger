import { Router } from 'express';
import { createPost } from './openai';
import { searchPhotos } from './unsplash/search-photos';
import { insertImages } from './helpers/insert-images';
import { getPostImages } from './helpers/get-post-images';
import { generatePostTitleInCategory } from './data/post-titles';
import { convertPostContent, savePost } from './sanity';
import { getPosts } from './sanity/get-posts';
import { htmlToBlocks } from '@sanity/block-tools';

export const defaultRoute = Router();

defaultRoute.get('/', async (req, res) => {
  const title = generatePostTitleInCategory('travel')
  const chatCompletion = await createPost({
    title,
    length: 1000,
  });

  const postContent = chatCompletion?.data.choices[0].message?.content
  if (!postContent) {
    res.send('Failed to generate post');
    return;
  }

  const regex = /<(h1|h2)>(.*?)<\/(h1|h2)>/g;
  const matches = postContent.match(regex);
  const headers = (matches || [])
    .map((match) => match.replace(/<\/?(h1|h2)>/g, ''))
    .filter((header) => header.toLocaleLowerCase() !== 'introduction')
    .slice(0, -1);
  const images = await getPostImages(headers)
  const formattedPostContent = insertImages(postContent, images)

  await savePost({
    title,
    content: convertPostContent(formattedPostContent),
    category: 'travel',
  })

  res.send(`
    <h1>${title}</h1>
    ${formattedPostContent}
  `);
});

defaultRoute.get('/photos', async (req, res) => {
  const photos = await searchPhotos('Hidden Gems in Germany')

  res.send(`${JSON.stringify(photos)}`);
})

defaultRoute.get('/create-post', async (req, res) => {
  const title = generatePostTitleInCategory('travel')
  const post = await savePost({
    title,
    content: convertPostContent('<h2>This is a test post</h2><p>With some paragraph text</p>'),
    category: 'travel',
  })

  console.log(JSON.stringify(post, null, 2))

  res.send(`<h1>${title}</h1>`);
})
