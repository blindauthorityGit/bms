import {defineType, defineField} from 'sanity'

export const postIconBoxItem = defineType({
  name: 'postIconBoxItem',
  title: 'Box',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (SVG)',
      type: 'image',
      options: {
        hotspot: false,
        // falls dein Studio das unterstützt:
        accept: 'image/svg+xml',
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (optional)',
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
      name: 'showNumbers',
      title: 'Nummern anzeigen (Override)',
      type: 'boolean',
      description: 'Wenn leer/aus, gilt die globale Einstellung der Section.',
    }),

    defineField({
      name: 'steps',
      title: 'Text-Blöcke (1,2,3 …)',
      type: 'array',
      of: [{type: 'iconBoxStep'}],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'icon',
      steps: 'steps',
    },
    prepare({title, media, steps}) {
      return {
        title: title || 'Box',
        subtitle: steps?.length ? `${steps.length} Text-Blöcke` : 'Keine Text-Blöcke',
        media,
      }
    },
  },
})
