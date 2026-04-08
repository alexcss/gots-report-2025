import { defineField, defineType } from 'sanity'
import { TfiBook } from 'react-icons/tfi' // Using book icon for chapter

export default defineType({
  name: 'chapter',
  title: 'Chapter',
  icon: TfiBook,
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
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'bg-white' },
          { title: 'Gray', value: 'bg-cultured' },
        ],
        layout: 'radio',
      },
      initialValue: 'bg-cultured',
      group: 'options',
    }),
    defineField({
      name: 'subtitle',
      title: 'Suptitle',
      type: 'string',
      group: 'content',
      initialValue: 'Chapter I',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageWidth',
      title: 'Image Width',
      type: 'string',
      group: 'asset',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Wide', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
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
      title: 'title',
      subtitle: 'subtitle',
      media: 'assets.0.image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Untitled Chapter',
      subtitle: subtitle,
      media,
    }),
  },
})
