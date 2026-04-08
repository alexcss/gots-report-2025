import { defineArrayMember, defineField } from 'sanity'
import { TbBlockquote } from 'react-icons/tb'

export default defineArrayMember({
  name: 'blockquote',
  title: 'Blockquote',
  icon: TbBlockquote,
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      description: 'The text content of the quote',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cite',
      title: 'Citation',
      type: 'string',
      description: 'The source or author of the quote',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      cite: 'cite',
    },
    prepare({ text, cite }) {
      return {
        title: text ? `"${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"` : 'Blockquote',
        subtitle: cite ? `— ${cite}` : '',
      }
    },
  },
})
