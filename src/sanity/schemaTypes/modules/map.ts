import { defineField, defineType } from 'sanity'
import { BsGeoAlt } from 'react-icons/bs'

export default defineType({
  name: 'map',
  title: 'Map',
  type: 'object',
  icon: BsGeoAlt,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'regions',
      title: 'Regions',
      type: 'array',
      of: [
        defineField({
          name: 'region',
          title: 'Region',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Region ID',
              type: 'string',
              options: {
                list: [
                  { title: 'North America', value: 'north-america' },
                  { title: 'APAC', value: 'apac' },
                  { title: 'Japan', value: 'japan' },
                  { title: 'DACH', value: 'dach' },
                  { title: 'United Kingdom', value: 'united-kingdom' },
                  { title: 'Africa', value: 'africa' },
                  { title: 'South Asia', value: 'south-asia' },
                  { title: 'Türkiye', value: 'turkiye' },
                ],
                layout: 'dropdown',
              },
              validation: Rule => Rule.required().error('Region ID is required'),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required().error('Region title is required'),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Rich text content for this region',
            }),
            defineField({
              name: 'personCard',
              title: 'Person Card',
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'img',
                }),
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  media: 'image.image',
                  name: 'name',
                  role: 'role',
                },
                prepare ({ media, name, role }) {
                  return {
                    title: name || 'No name provided',
                    subtitle: role || 'No role provided',
                    media: media,
                  }
                },
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              id: 'id',
              media: 'personCard.image.image',
            },
            prepare ({ title, id, media }) {
              return {
                title: title || 'No title provided',
                subtitle: id ? `ID: ${id}` : 'No ID provided',
                media: media || BsGeoAlt,
              }
            },
          },
        }),
      ],
      group: 'content',
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
      regions: 'regions',
    },
    prepare ({ title, regions }) {
      return {
        title: `Map ${title ? '- ' + title : ''}`,
        subtitle: `${regions?.length || 0} regions configured`,
        media: BsGeoAlt,
      }
    },
  },
})
