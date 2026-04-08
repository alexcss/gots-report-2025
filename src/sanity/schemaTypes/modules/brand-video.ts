import { defineField, defineType } from 'sanity'
import { TfiVideoClapper } from 'react-icons/tfi'

export default defineType({
  name: 'brand-video',
  title: 'Brand Video',
  icon: TfiVideoClapper,
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
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'video',
      title: 'Video',
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
          description: 'Optional image to display before the video starts playing',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'video.posterImage',
    },
    prepare: ({ title, media }) => ({
      title: `Brand Video - ${title || 'Untitled'}`,
      media: media || TfiVideoClapper,
    }),
  },
})
