import { defineArrayMember, defineField, defineType } from 'sanity'
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
          name: 'previousYear',
          title: 'Previous Year',
          type: 'string',
          validation: (Rule) => Rule.max(10),
        }),
        defineField({
          name: 'currentYear',
          title: 'Current Year',
          type: 'string',
          validation: (Rule) => Rule.max(10),
        }),
      ],
    }),
    defineField({
      name: 'globalPresence',
      title: 'Global Presence',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'countries',
          title: 'Countries',
          type: 'object',
          options: {
            collapsible: false,
          },
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required().max(5),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(50)
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(200),
            }),
          ],
        }),
        defineField({
          name: 'certificationBodies',
          title: 'Certification Bodies',
          type: 'object',
          options: {
            collapsible: false,
          },
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required().max(5),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(50)
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(200),
            }),
          ],
        }),
      ],
    }),
      defineField({
        name: 'impactMetrics',
        title: 'Impact Metrics',
        type: 'object',
        group: 'content',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'block',
                styles: [{ title: 'Normal', value: 'normal' }],
                lists: [],
                marks: {
                  decorators: [{ title: 'Bold', value: 'strong' }],
                  annotations: [],
                },
              }),
            ],
          }),
          defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  defineField({
                    name: 'period',
                    title: 'Period',
                    type: 'string',
                  }),
                  defineField({
                    name: 'value',
                    title: 'Value',
                    type: 'string',
                  }),
                  defineField({
                    name: 'unit',
                    title: 'Unit',
                    type: 'string',
                  }),
                  defineField({
                    name: 'metric',
                    title: 'Metric',
                    type: 'string',
                  }),
                ],
                preview: {
                  select: {
                    period: 'period',
                    metric: 'metric',
                  },
                  prepare: ({ period, metric }) => ({
                    title: `${period} - ${metric}`,
                  }),
                },
              },
            ],
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
