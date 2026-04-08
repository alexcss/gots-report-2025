import { defineField, defineType } from 'sanity'
import { TfiUser } from 'react-icons/tfi'

export default defineType({
  name: 'founders',
  title: 'Founders',
  icon: TfiUser,
  type: 'object',
  groups: [{ name: 'content', default: true }, { name: 'options' }],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'founders',
      title: 'Founders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Photo',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
            },
            {
              name: 'sign',
              type: 'image',
              title: 'Signature',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      founders: 'founders',
    },
    prepare: ({ founders }) => ({
      title: 'Founders',
      subtitle: `${founders?.length || 0} founder(s)`,
    }),
  },
})
