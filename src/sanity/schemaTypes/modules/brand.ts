import { defineField, defineType } from 'sanity'
import { TfiBriefcase } from 'react-icons/tfi'
import { admonition, blockquote, highlightedList, imageBlock } from '@/sanity/schemaTypes/fragments'

export default defineType({
  name: 'brand',
  title: 'Brand',
  icon: TfiBriefcase,
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
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, imageBlock, admonition, highlightedList, blockquote],
      group: 'content',
    }),
    defineField({
      name: 'assets',
      title: 'Assets',
      type: 'array',
      of: [{ type: 'img' }],
      validation: (Rule) => Rule.max(1).required(),
      group: 'asset',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      group: 'options',
    }),
    defineField({
      name: 'imageFill',
      title: 'Image Fill',
      description: 'When checked, the image will fill the entire column',
      type: 'boolean',
      initialValue: false,
      group: 'options',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'assets.0.image',
      imagePosition: 'imagePosition',
      imageFill: 'imageFill',
    },
    prepare: ({ title, media, imagePosition, imageFill }) => ({
      title: `Brand - ${title || 'Untitled'}`,
      subtitle: `Image position: ${imagePosition || 'right'}${imageFill ? ', Fill column' : ''}`,
      media,
    }),
  },
})
