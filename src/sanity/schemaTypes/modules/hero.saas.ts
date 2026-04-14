import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'

export default defineType({
  name: 'hero.saas',
  title: 'Hero (SaaS)',
  icon: TfiLayoutCtaCenter,
  type: 'object',
  groups: [{ name: 'content', default: true }, { name: 'asset' }, { name: 'options' }],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'pretitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'textWidth',
      title: 'Text Block Width',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Wide', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
      group: 'options',
    }),
    defineField({
      name: 'textPosition',
      title: 'Text Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
        layout: 'radio',
      },
      initialValue: 'top-left',
      group: 'options',
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [{ type: 'img' }],
      validation: (Rule) => Rule.max(1),
      group: 'asset',
    }),
  ],
  preview: {
    select: {
      title: 'pretitle',
      content: 'content',
      media: 'assets.0.image',
    },
    prepare: ({ title, media }) => ({
      title: title,
      subtitle: 'Hero (SaaS)',
      media,
    }),
  },
})
