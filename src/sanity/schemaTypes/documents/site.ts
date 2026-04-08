import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site settings',
  type: 'document',
  groups: [{ name: 'branding', default: true }, { name: 'info' }, { name: 'navigation' }],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'header',
      description: 'Content displayed in the header',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: (Rule) => Rule.max(200).required(),
        }),
        defineField({
          name: 'tagline',
          type: 'string',
          validation: (Rule) => Rule.max(200),
        }),
      ],
      group: 'branding',
    }),
    defineField({
      name: 'footerTagline',
      description: 'Tagline displayed in the footer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          // Only allow numbered lists
          lists: [],
          marks: {
            // Only allow these decorators
            decorators: [],
          },
        },
      ],
      group: 'branding',
    }),
    defineField({
      name: 'blurb',
      description: 'Content displayed in the footer',
      type: 'array',
      of: [{ type: 'block', lists: [] }],
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      type: 'logo',
      group: 'branding',
    }),
    defineField({
      name: 'announcements',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'announcement' }] }],
      group: 'info',
    }),
    defineField({
      name: 'copyright',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
      group: 'info',
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-action (global)',
      description: 'Typically used in the header and/or footer.',
      type: 'array',
      of: [{ type: 'cta' }],
      group: 'navigation',
    }),
    defineField({
      name: 'headerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'footerMenu',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
    defineField({
      name: 'social',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'navigation',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site settings',
    }),
  },
})
