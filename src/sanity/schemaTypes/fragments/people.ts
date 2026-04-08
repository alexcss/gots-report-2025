import { defineField, defineType } from 'sanity'
import { IoMdPeople } from 'react-icons/io'

export default defineType({
  name: 'people',
  title: 'People',
  type: 'object',
  icon: IoMdPeople,
  fields: [
    defineField({
      name: 'items',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'img',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image.image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'items.0.name',
      subtitle: 'items.0.role',
      media: 'items.0.image.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'People',
        subtitle: subtitle ? `${subtitle} and others` : 'People list',
        media: media || IoMdPeople,
      }
    },
  },
})
