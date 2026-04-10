import { defineArrayMember, defineField } from 'sanity'
import { BsLayoutSplit } from 'react-icons/bs'

export default defineArrayMember({
  name: 'twoColImage',
  title: 'Two Column Image',
  type: 'object',
  icon: BsLayoutSplit,
  fields: [
    defineField({
      name: 'imageLeft',
      title: 'Left Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'source',
          type: 'url',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageRight',
      title: 'Right Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'source',
          type: 'url',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columnLayout',
      title: 'Column Layout',
      type: 'string',
      options: {
        list: [
          { title: '50/50', value: '50-50' },
          { title: '1/3 + 2/3', value: '33-67' },
          { title: '2/3 + 1/3', value: '67-33' },
        ],
        layout: 'radio',
      },
      initialValue: '50-50',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      imageLeft: 'imageLeft',
      imageRight: 'imageRight',
      layout: 'columnLayout',
    },
    prepare({ imageLeft, imageRight, layout }) {
      const layoutLabels = {
        '50-50': '50/50',
        '33-67': '1/3 + 2/3',
        '67-33': '2/3 + 1/3',
      }
      return {
        title: 'Two Column Image',
        subtitle: layoutLabels[layout as keyof typeof layoutLabels] || layout,
        media: imageLeft,
      }
    },
  },
})
