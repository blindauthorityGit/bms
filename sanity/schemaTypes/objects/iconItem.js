import {defineType, defineField} from 'sanity'

export const iconItem = defineType({
  name: 'iconItem',
  title: 'Icon Item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Einfaches Line-Icon (SVG oder PNG)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
})
