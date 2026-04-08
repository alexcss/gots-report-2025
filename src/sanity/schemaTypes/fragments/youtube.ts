import { defineField, defineType } from 'sanity'
import { FaYoutube } from 'react-icons/fa'
// import getYouTubeId from 'get-youtube-id'

export default defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  icon: FaYoutube,
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      description: 'Enter the full YouTube video URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare ({ url }) {
      // const id = getYouTubeId(url) || ''
      // const thumb = id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : ''
      return {
        title: `YouTube Video`,
        subtitle: url || 'No URL provided',
        media: FaYoutube,
      }
    },
  },
})
