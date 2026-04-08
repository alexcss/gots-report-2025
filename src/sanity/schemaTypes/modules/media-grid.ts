import { defineField, defineType } from 'sanity'
import { BsGridFill } from 'react-icons/bs'

export default defineType({
  name: 'mediaGrid',
  title: 'Media Grid',
  type: 'object',
  icon: BsGridFill,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'items',
              title: 'Media Items',
              type: 'array',
              of: [
                defineField({
                  name: 'mediaItem',
                  title: 'Media Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'mediaType',
                      title: 'Media Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Image', value: 'image' },
                          { title: 'Video', value: 'video' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'image',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'img',
                      hidden: ({ parent }) => parent?.mediaType !== 'image',
                    }),
                    defineField({
                      name: 'video',
                      title: 'Video',
                      type: 'file',
                      hidden: ({ parent }) => parent?.mediaType !== 'video',
                      options: {
                        accept: 'video/*',
                      },
                    }),
                    defineField({
                      name: 'width',
                      title: 'Width',
                      type: 'number',
                      description: 'Width of the media item',
                      hidden: ({ parent }) => parent?.mediaType !== 'video',
                      validation: (Rule) => Rule.min(1).error('Width is required for videos'),
                    }),
                    defineField({
                      name: 'height',
                      title: 'Height',
                      type: 'number',
                      description: 'Height of the media item',
                      hidden: ({ parent }) => parent?.mediaType !== 'video',
                      validation: (Rule) => Rule.min(1).error('Height is required for videos'),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 3,
                    }),
                  ],
                  preview: {
                    select: {
                      media: 'image.image',
                      type: 'mediaType',
                      description: 'description',
                    },
                    prepare({ media, type, description }) {
                      return {
                        title: type === 'image' ? 'Image' : 'Video',
                        subtitle: description || '',
                        media: media,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              items: 'items',
            },
            prepare({ items }) {
              return {
                title: `Row with ${items?.length || 0} items`,
              }
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Brand (hover descriptions)', value: 'brand' },
          { title: 'Photospread (with lightbox)', value: 'photospread' },
        ],
        layout: 'radio',
      },
      initialValue: 'brand',
      group: 'options',
    }),
    defineField({
      name: 'options',
      type: 'module-options',
      group: 'options',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rows: 'rows',
    },
    prepare({ rows, title }) {
      return {
        title: `Media Grid ${title ? '- ' + title : ''}`,
        subtitle: `${rows?.length || 0} rows`,
      }
    },
  },
})
