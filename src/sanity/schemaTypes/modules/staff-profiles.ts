import { defineField, defineType } from 'sanity'
import { IoPeopleOutline } from 'react-icons/io5'

export default defineType({
  name: 'staff-profiles',
  title: 'Staff Profiles',
  type: 'object',
  icon: IoPeopleOutline,
  groups: [{ name: 'content', default: true }, { name: 'options' }],
  fields: [
    defineField({
      name: 'options',
      title: 'Module options',
      type: 'module-options',
      group: 'options',
    }),
    defineField({
      name: 'profiles',
      title: 'Staff Profiles',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Profile Image',
              type: 'img',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(300),
            }),
            defineField({
              name: 'role',
              title: 'Role/Title',
              type: 'string',
              validation: (Rule) => Rule.max(300),
            }),
            defineField({
              name: 'content',
              title: 'Profile Content',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image.image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'profiles[0].name',
      subtitle: 'profiles[0].role',
      media: 'profiles[0].image.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Staff Profiles',
        subtitle: subtitle ? `Featuring: ${title} and others` : 'Staff/team member profiles',
        media: media || IoPeopleOutline,
      }
    },
  },
})
