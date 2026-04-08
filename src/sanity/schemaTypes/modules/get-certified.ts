import { defineField, defineType } from 'sanity'
import { TfiMedall } from 'react-icons/tfi'

export default defineType({
  name: 'get-certified',
  title: 'Get Certified',
  icon: TfiMedall,
  type: 'object',
  groups: [{ name: 'content', default: true }, { name: 'media', title: 'Media' }, { name: 'options' }],
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
    }),
    defineField({
      name: 'items',
      title: 'Certification Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certificationStep',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Step Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'img',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'items',
      media: 'backgroundImage.image',
    },
    prepare: ({ title, steps = [], media }) => ({
      title: title || 'Get Certified',
      subtitle: `${steps.length} certification ${steps.length === 1 ? 'step' : 'steps'}`,
      media: media || TfiMedall,
    }),
  },
})
