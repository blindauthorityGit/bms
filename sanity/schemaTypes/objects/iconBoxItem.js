import {defineType, defineField} from 'sanity'

export const iconBoxItem = defineType({
  name: 'iconBoxItem',
  title: 'Icon Box',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG/PNG)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'showNumbers',
      title: 'Nummern anzeigen (optional Override)',
      type: 'boolean',
      description: 'Wenn leer, gilt die Einstellung der Section.',
    }),

    defineField({
      name: 'steps',
      title: 'Schritte (1,2,3 …)',
      type: 'array',
      of: [{type: 'iconBoxStep'}],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon', steps: 'steps'},
    prepare({title, media, steps}) {
      return {
        title: title || 'Icon Box',
        subtitle: steps?.length ? `${steps.length} Schritte` : 'Keine Schritte',
        media,
      }
    },
  },
})
