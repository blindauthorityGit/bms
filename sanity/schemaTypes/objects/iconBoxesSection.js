import {defineType, defineField} from 'sanity'

export const iconBoxesSection = defineType({
  name: 'iconBoxesSection',
  title: 'Icon Boxes Section',
  type: 'object',

  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      initialValue: 'Drei Wege, wie du mit',
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      initialValue: 'Longevity',
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix',
      type: 'string',
      initialValue: 'starten kannst',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe',
      type: 'string',
      initialValue: '#B21F24',
      description: 'z.B. Primary Rot',
    }),

    defineField({
      name: 'intro',
      title: 'Intro Text (optional)',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Offwhite', value: 'offwhite'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'showNumbers',
      title: 'Nummern anzeigen (global)',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'items',
      title: 'Boxen',
      type: 'array',
      of: [
        {type: 'iconBox'}, // ✅ alter Typ (damit bestehende Items nicht brechen)
        {type: 'postIconBoxItem'}, // ✅ neuer Typ
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],

  preview: {
    select: {title: 'headlineHighlight', count: 'items'},
    prepare({title, count}) {
      return {
        title: `Icon Boxes – ${title || ''}`.trim(),
        subtitle: count?.length ? `${count.length} Boxen` : 'Keine Boxen',
      }
    },
  },
})
