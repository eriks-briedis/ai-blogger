import { openai } from './setup'

export interface CreatePostParams {
  title: string
  minSectionParagraphs?: number
  length?: number
  tone?: 'casual' | 'formal'
  format?: 'html' | 'markdown'
}

export const createPost = async ({
  title,
  minSectionParagraphs = 2,
  length = 500,
  tone = 'casual',
  format = 'html',
}: CreatePostParams) => {
  try {
    return await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `
        Act as an expert blogger.
        Write a blog post with a title "${title}".
        Use transition words.
        Use active voice
        This post has to be written in a ${tone} tone.
        The post has to be around ${length} words long.
        Post has to be formatted in ${format} but print only content inside the <body> tag and remove <body> opening and closing tags.
        Use <h2> tags for section headers.
        Each section should have at least ${minSectionParagraphs} paragraphs.
        Don't print the blog post title.
        Start the post with a short introduction without a header.
        Add a closing paragraph at the end of the post to summarize the post.`,
      }],
    })
  } catch (e) {
    console.error('Failed to generate post')
  }
}
