import {defineType, defineField} from 'sanity'

export const iconBox = defineType({
  name: 'iconBox',
  title: 'Icon Box',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG/PNG)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'link', // du verwendest das schon bei hero/aboutTeaser
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon'},
    prepare({title, media}) {
      return {title: title || 'Icon Box', media}
    },
  },
})
