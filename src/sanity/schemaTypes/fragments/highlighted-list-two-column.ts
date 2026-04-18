import { defineType, defineField } from 'sanity'
import { IoMdListBox } from 'react-icons/io'

export default defineType({
  name: 'highlightedListTwoColumn',
  title: 'Highlighted List Two Column',
  type: 'object',
  icon: IoMdListBox,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftCol',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'rightCol',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
