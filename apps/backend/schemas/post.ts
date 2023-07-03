export default {
  name: 'post',
  type: 'document',
	title: 'Post',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
  ]
}
