import { defineField, defineType } from 'sanity'
import { MdAttachMoney } from 'react-icons/md'

export default defineType({
  name: 'inflow',
  title: 'Inflow Block',
  type: 'object',
  icon: MdAttachMoney,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              value: 'value',
            },
            prepare({ title, value }) {
              return {
                title,
                subtitle: `Value: ${value}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items = [] }) {
      return {
        title: title || 'Inflow Block',
        subtitle: `${items.length} items`,
      }
    },
  },
})
