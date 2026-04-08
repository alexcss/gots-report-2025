import { defineField, defineType } from 'sanity'
import { FaSatellite } from 'react-icons/fa6'
import { blockquote, highlightedList, imageBlock } from '@/sanity/schemaTypes/fragments'

export default defineType({
  name: 'satellite',
  title: 'Satellite',
  icon: FaSatellite,
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
      name: 'video',
      title: 'Intro Video',
      type: 'file',
      options: {
        accept: 'video/*',
        storeOriginalFilename: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',

      fields: [
        {
          name: 'posterImage',
          title: 'Poster Image',
          type: 'image',
          description: 'Image to display before the video loads',
        },
      ],
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
      of: [{ type: 'block' }, imageBlock, highlightedList, blockquote, { type: 'youtube' }],
      group: 'content',
    }),

  ],
  preview: {
    select: {
      title: 'title',
      media: 'video.posterImage',
    },
    prepare: ({ title, media }) => ({
      title: title || 'Satellite',
      subtitle: 'Satellite section',
      media: media || FaSatellite,
    }),
  },
})
