import {Schema} from '@sanity/schema'
import {htmlToBlocks, getBlockContentFeatures} from '@sanity/block-tools'

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
          of: [{type: 'block'}],
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
    parseHtml: (html) => new JSDOM(html).window.document
  })
}
