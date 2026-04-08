import { defineArrayMember, defineField } from 'sanity'
import { IoMdListBox } from 'react-icons/io'

export default defineArrayMember({
  name: 'highlightedList',
  title: 'Highlighted List',
  type: 'object',
  icon: IoMdListBox,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'block',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Highlighted List',
      }
    },
  },
})
