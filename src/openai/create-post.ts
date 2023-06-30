import { openai } from './setup';

export interface CreatePostParams {
  title: string;
  length?: number;
  tone?: 'casual' | 'formal';
  format?: 'html' | 'markdown';
}

export const createPost = async ({
  title,
  length = 500,
  tone = 'casual',
  format = 'html',
}: CreatePostParams) => {
  try {
    return openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `Act as an expert blogger.
        Write a blog post with a title \"${title}\".
        Use transition words.
        Use active voice
        This post should be written in a ${tone} tone.
        The post should be around ${length} words long.
        Post should be formatted in ${format}.
        Use <h2> tags for section headers.
        Add a placeholder for an image after each section like this: [{name-of-the-section}-image] where "name-of-the-section" is replaced with the name of the section converted to kebab-case.`
      }],
    });
  } catch (e) {
    console.log('Failed to generate post');
  }
}
