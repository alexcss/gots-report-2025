import { defineField, defineType } from 'sanity'
import { MdEmail } from 'react-icons/md'

export default defineType({
  name: 'emailCta',
  title: 'Email CTA',
  type: 'object',
  icon: MdEmail,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      email: 'email',
    },
    prepare({ label, email }) {
      return {
        title: label || 'Email CTA',
        subtitle: email,
        media: MdEmail,
      }
    },
  },
})
