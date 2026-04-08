import { defineField, defineType } from 'sanity'
import { PiGlobeHemisphereEastBold } from 'react-icons/pi'
import { blockquote, highlightedList, imageBlock } from '@/sanity/schemaTypes/fragments'

export default defineType({
  name: 'behind-the-seams',
  title: 'Behind The Seams',
  icon: PiGlobeHemisphereEastBold,
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
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
        { type: 'phone' },
        { type: 'statistics' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'btsButton',
      type: 'object',
      title: 'BehindTheSeams Button',
      group: 'content',
      options: { columns: 2 },
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'url',
          type: 'url',
          title: 'Button URL',
        },
      ],
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaignDates',
      type: 'object',
      title: 'Campaign Dates',
      group: 'content',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Campaign dates :',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'date',
          type: 'string',
          title: 'Date',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
      group: 'content',
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button',
      group: 'content',
      options: { columns: 2 },
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'url',
          type: 'url',
          title: 'Button URL',
        },
      ],
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
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Behind The Seams',
        subtitle: 'Behind The Seams module',
      }
    },
  },
})
