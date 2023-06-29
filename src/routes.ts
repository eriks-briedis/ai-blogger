import { Router } from 'express';
import { createPost } from './openai';

export const defaultRoute = Router();

defaultRoute.get('/', async (req, res) => {
  const chatCompletion = await createPost();
  if (!chatCompletion) {
    res.send('Failed to generate post');
    return;
  }


  res.send(`${JSON.stringify(chatCompletion.data.choices[0].message)}`);
});
