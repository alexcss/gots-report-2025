import { defineField, defineType } from 'sanity'
import { IoIosPhonePortrait } from 'react-icons/io'

export default defineType({
  name: 'phone',
  title: 'Phone',
  icon: IoIosPhonePortrait,
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'img',
      description: 'Add an image to display in the phone frame',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Add a video to display in the phone frame',
      options: {
        accept: 'video/*',
        storeOriginalFilename: true,
      },
      validation: (Rule) => Rule.required(),
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
      media: 'image.imnage',
    },
    prepare({ media }) {
      return {
        title: 'Phone Media',
        subtitle: 'Phone display',
        media,
      }
    },
  },
})
