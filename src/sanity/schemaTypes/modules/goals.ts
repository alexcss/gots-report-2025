import { defineField, defineType } from 'sanity'
import { MdGridOn } from 'react-icons/md'
import { LuGoal } from 'react-icons/lu'

const colorOptions = [
  { title: 'Blue (00689D)', value: '00689D' },
  { title: 'Light Blue (0A97D9)', value: '0A97D9' },
  { title: 'Dark Blue (19486A)', value: '19486A' },
  { title: 'Sky Blue (26BDE2)', value: '26BDE2' },
  { title: 'Dark Green (3F7E44)', value: '3F7E44' },
  { title: 'Green (4C9F38)', value: '4C9F38' },
  { title: 'Light Green (56C02B)', value: '56C02B' },
  { title: 'Magenta (A21942)', value: 'A21942' },
  { title: 'Gold (BF8B2E)', value: 'BF8B2E' },
  { title: 'Red (C5192D)', value: 'C5192D' },
  { title: 'Pink (DD1367)', value: 'DD1367' },
  { title: 'Yellow (DDA83A)', value: 'DDA83A' },
  { title: 'Bright Red (E5243B)', value: 'E5243B' },
  { title: 'Bright Yellow (FCC30B)', value: 'FCC30B' },
  { title: 'Orange (FD6925)', value: 'FD6925' },
  { title: 'Amber (FD9D24)', value: 'FD9D24' },
  { title: 'Red Orange (FF3A21)', value: 'FF3A21' },
]

export default defineType({
  name: 'goals',
  title: 'Goals Module',
  icon: MdGridOn,
  type: 'object',
  groups: [
    { name: 'content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'richText',
      title: 'Rich Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'items',
      title: 'Goal Items',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'goalItem',
          fields: [
            defineField({
              name: 'bgColor',
              title: 'Background Color',
              type: 'string',
              options: {
                list: colorOptions,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'img',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              media: 'image.image',
              bgColor: 'bgColor',
            },
            prepare({ title, media, bgColor }) {
              return {
                title,
                media: media || LuGoal,
                subtitle: `Background color: #${bgColor}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'options',
      title: 'Module Options',
      type: 'module-options',
      group: 'options',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Goals Module',
        subtitle: 'Goals Module',
      }
    },
  },
})
