import { defineField, defineType } from 'sanity'
import { IoMdPeople } from 'react-icons/io'

export default defineType({
  name: 'in-loving-memory',
  title: 'In Loving Memory',
  type: 'object',
  icon: IoMdPeople,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'In Loving Memory'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'date',
      title: 'date',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'memories',
      title: 'Memories',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'items.0.name',
      subtitle: 'items.0.role',
      media: 'items.0.image.image',
    },
    prepare() {
      return {
        title: 'In Loving Memory',
        media: IoMdPeople,
      }
    },
  },
})
