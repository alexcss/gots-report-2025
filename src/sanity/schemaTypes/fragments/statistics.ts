import { defineField, defineType } from 'sanity'
import { MdQueryStats } from 'react-icons/md'

export default defineType({
  name: 'statistics',
  title: 'Statistics Block',
  type: 'object',
  icon: MdQueryStats,
  fields: [
    defineField({
      name: 'statistics',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isFullWidth',
              type: 'boolean',
              title: 'Full Width',
              description: 'Display this statistic item at full width (spanning both columns)',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
              isFullWidth: 'isFullWidth',
            },
            prepare({ value, label, isFullWidth }) {
              return {
                title: value,
                subtitle: `${label}${isFullWidth ? ' (Full Width)' : ''}`,
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
      statistics: 'statistics',
    },
    prepare({ statistics = [] }) {
      return {
        title: 'Statistics Block',
        subtitle: `${statistics.length} statistic${statistics.length === 1 ? '' : 's'}`,
      }
    },
  },
})
