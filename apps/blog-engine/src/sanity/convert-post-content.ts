import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title',
        },
        {
          title: 'Body',
          name: 'content',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image' },
          ],
        },
      ],
    },
  ],
})

// The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema
  .get('post')
  .fields
  .find((field: any) => field.name === 'content').type

export const convertPostContent = (content: string) => {
  return htmlToBlocks(content, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize: (el: any) => {
          if (el?.tagName?.toLowerCase() === 'p') {
            return {
              _type: 'block',
              children: [
                {
                  _type: 'p',
                  text: el.textContent,
                },
              ],
            }
          }

          if (el?.tagName?.toLowerCase() === 'h2') {
            return {
              _type: 'block',
              children: [
                {
                  _type: 'h2',
                  text: el.textContent,
                },
              ],
            }
          }

          if (!el.tagName || el.tagName.toLowerCase() !== 'img') {
            return undefined
          }

          return {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: el.src,
            },
          }
        },
      },
    ],
  })
}
