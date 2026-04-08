import { defineField, defineType } from 'sanity'
import { GoOrganization } from 'react-icons/go'

export default defineType({
  name: 'organisationInfo',
  title: 'Organisation Info',
  type: 'object',
  icon: GoOrganization,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'img',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(200),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              label: 'label',
              media: 'icon.image',
            },
            prepare({ title, label, media }) {
              return {
                title: label || 'Item',
                subtitle: title || '',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items = [] }) {
      return {
        title: 'Organisation Info',
        subtitle: `${items.length} items`,
      }
    },
  },
})
