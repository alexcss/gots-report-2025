import { defineField, defineType } from 'sanity'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { imageBlock, highlightedList, blockquote } from '../fragments'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
  name: 'richtext-module',
  title: 'Richtext module',
  icon: VscSymbolKeyword,
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },
        imageBlock,
        highlightedList,
        blockquote,
        { type: 'inflow' },
        { type: 'organisationInfo' },
        { type: 'emailCta' },
        { type: 'people' },
        { type: 'youtube' },
        // defineArrayMember({
        //   title: 'Code block',
        //   type: 'code',
        //   options: {
        //     withFilename: true,
        //   },
        // }),
        //{ type: 'custom-html' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'tableOfContents',
      type: 'boolean',
      initialValue: false,
      group: 'options',
    }),
    defineField({
      name: 'tocPosition',
      type: 'string',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
      },
      hidden: ({ parent }) => !parent.tableOfContents,
      initialValue: 'right',
      group: 'options',
    }),
    defineField({
      name: 'stretch',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent.tableOfContents,
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

  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare: ({ content }) => ({
      title: getBlockText(content),
      subtitle: 'Richtext module',
    }),
  },
})
