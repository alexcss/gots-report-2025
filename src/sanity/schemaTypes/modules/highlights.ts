import { defineField, defineType } from 'sanity'
import { IoStatsChartOutline } from 'react-icons/io5'

export default defineType({
  name: 'highlights',
  title: 'Highlights',
  type: 'object',
  icon: IoStatsChartOutline,
  groups: [{ name: 'content', default: true }, { name: 'features' }, { name: 'options' }],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'mainStatistic',
      title: 'Main Statistic',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'number',
          title: 'Number',
          type: 'string',
          validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(300),
        }),
        defineField({
          name: 'growthPercentage',
          title: 'Growth Percentage',
          type: 'string',
          description: 'Include the + or - sign, e.g., "+5.2%"',
          validation: (Rule) => Rule.max(20),
        }),
        defineField({
          name: 'previousYearNumber',
          title: 'Previous Year Number',
          type: 'string',
          description: 'The number from the previous year',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'currentYear',
          title: 'Current Year',
          type: 'string',
          validation: (Rule) => Rule.max(10),
        }),
        defineField({
          name: 'previousYear',
          title: 'Previous Year',
          type: 'string',
          validation: (Rule) => Rule.max(10),
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Feature Boxes',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'img',
              description: 'Icon for the feature box',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(300),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon.image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mainStatistic.number',
      year: 'year',
    },
    prepare({ title, subtitle, year }) {
      return {
        title: title || 'Highlights',
        subtitle: subtitle ? `${subtitle} ${year ? year : ''}` : 'Key statistics and features',
        media: IoStatsChartOutline,
      }
    },
  },
})
