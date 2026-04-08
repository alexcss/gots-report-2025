// schemas/modules/resourcesModule.ts
import { defineField, defineType } from 'sanity'
import { BiDownload } from 'react-icons/bi'

export const resourceItem = defineType({
  name: 'resourceItem',
  title: 'Resource Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const resourceSection = defineType({
  name: 'resourceSection',
  title: 'Resource Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'resourceItem' }],
    }),
  ],
})

export default defineType({
  name: 'resources',
  title: 'Resources',
  icon: BiDownload,
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
      validation: (Rule) => Rule.required(),
      group: 'content',
      initialValue: 'Resources',
    }),
    defineField({
      name: 'newResources',
      title: 'New Resources',
      type: 'resourceSection',
      group: 'content',

    }),
    defineField({
      name: 'updatedResources',
      title: 'Updated Resources',
      type: 'resourceSection',
      group: 'content',

    }),
    defineField({
      name: 'link',
      type: 'link',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Resources Module',
        media: BiDownload,
      }
    },
  },
})
