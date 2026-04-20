import { defineField, defineType } from 'sanity'
import { PiGlobeHemisphereEastBold } from 'react-icons/pi'

const basePortableText = [
  {
    type: 'block',
    styles: [
      { title: 'Paragraph', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          fields: [{ name: 'href', type: 'url' }],
        },
      ],
    },
  },
]


const simpleRichTextField = defineField({
  name: 'content',
  type: 'array',
  of: basePortableText
})

const createJourneyBlockFields = () => [simpleRichTextField, defineField({ name: 'image', type: 'image', title: 'Image' })]
export default defineType({
  name: 'journey',
  title: 'Journey',
  icon: PiGlobeHemisphereEastBold,
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'options', title: 'Options' },
  ],
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'content',
    }),
    defineField({
      name: 'content',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'block1',
      type: 'object',
      fields: createJourneyBlockFields(),
      group: 'content',
    }),
    defineField({
      name: 'block2',
      type: 'object',
      fields: [
        ...createJourneyBlockFields(),
        defineField({
          name: 'content2',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'block3',
      type: 'object',
      fields: [
        ...createJourneyBlockFields(),
        defineField({
          name: 'content2',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'block4',
      type: 'object',
      fields: createJourneyBlockFields(),
      group: 'content',
    }),
    defineField({
      name: 'block5',
      type: 'object',
      fields: [
        ...createJourneyBlockFields(),
        defineField({
          name: 'content2',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'block6',
      type: 'object',
      fields: createJourneyBlockFields(),
      group: 'content',
    }),
    defineField({
      name: 'block7',
      type: 'object',
      fields: [
        simpleRichTextField
      ],
      group: 'content',
    }),
    defineField({
      name: 'endContent',
      title: 'Highlighted List',
      type: 'highlightedListTwoColumn',
      group: 'content',
    })
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Journey',
        subtitle: 'Journey module',
      }
    },
  },
})
