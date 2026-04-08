import { defineField, defineType } from 'sanity'
import { TfiPieChart } from 'react-icons/tfi'

export default defineType({
  name: 'annual-survey',
  title: 'Annual Survey',
  icon: TfiPieChart,
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
      name: 'title',
      type: 'string',
      group: 'content',
      initialValue: 'Annual Survey',
    }),
    defineField({
      name: 'items',
      title: 'Survey Items',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              text: 'text',
            },
            prepare: ({ text }) => ({
              title: text,
            }),
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Text',
              rows: 6,
            },
            {
              name: 'value',
              type: 'number',
              title: 'Value',
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(12),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => ({
      title: 'Annual Survey',
      subtitle: `${items?.length || 0} item(s)`,
    }),
  },
})
