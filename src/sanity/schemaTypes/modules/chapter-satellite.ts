import { defineField, defineType } from 'sanity'
import { MdOutlineOndemandVideo } from 'react-icons/md'

export default defineType({
  name: 'chapter-satellite',
  title: 'Chapter Satellite',
  type: 'object',
  icon: MdOutlineOndemandVideo,
  groups: [{ name: 'content', default: true }, { name: 'options' }],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'subtitle',
      title: 'Suptitle',
      type: 'string',
      group: 'content',
      initialValue: 'Chapter Satellite',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      description: 'Add exactly 7 videos. First and last columns will have 2 videos each, middle column will have 3 videos.',
      type: 'array',
      of: [{ type: 'file', options: { accept: 'video/*' } }],
      validation: (Rule) => Rule.required().length(7).error('Exactly 7 videos are required'),
      group: 'content',

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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Chapter Satellite',
        subtitle: subtitle || 'Video grid module',
      }
    },
  },
})
