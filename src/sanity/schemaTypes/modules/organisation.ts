import { defineField, defineType } from 'sanity'
import { PiUsersThreeFill } from 'react-icons/pi'
import { CgViewCols } from 'react-icons/cg'

export default defineType({
  name: 'organisation',
  title: 'Organisation',
  type: 'object',
  icon: PiUsersThreeFill,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'row',
          icon: CgViewCols,
          preview: {
            select: {
              items: 'items',
            },
            prepare({ items }) {
              return {
                title: 'Row',
                subtitle: `${items?.length || '0'} persons`,
              }
            },
          },
          fields: [
            defineField({
              name: 'items',
              title: 'People',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'person',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'role',
                      title: 'Role',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'image',
                      title: 'Photo',
                      type: 'img',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'role',
                      media: 'image.image',
                    },
                  },
                }),
              ],
            }),
          ],
        },
      ],

    }),
    defineField({
      name: 'options',
      type: 'module-options',
      group: 'options',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Organisation Module',
      }
    },
  },
})
