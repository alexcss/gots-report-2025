import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'

export default defineType({
  name: 'hero',
  title: 'Hero',
  icon: TfiLayoutCtaCenter,
  type: 'object',
  groups: [{ name: 'content', default: true }, { name: 'options' }],
  fieldsets: [
    { name: 'alignment', options: { columns: 2 } },
    { name: 'image', options: { columns: 2 } },
  ],
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
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [{ type: 'img' }],
      validation: (Rule) => Rule.max(1),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'pretitle',
      media: 'assets.0.image',
    },
    prepare: ({ title, media }) => ({
      title: title || 'Untitled Hero',
      subtitle: 'Hero',
      media,
    }),
  },
})
