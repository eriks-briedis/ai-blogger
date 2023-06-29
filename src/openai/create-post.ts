import { openai } from './setup';

export const createPost = async () => {
  try {
    return openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: 'User Write me a blog post with a title \"10 Must-Visit Hidden Gems in Germany\". This post should be written in a casual tone. Post should be formatted in html.'}],
    });
  } catch (e) {
    console.log('Failed to generate post');
  }
}
