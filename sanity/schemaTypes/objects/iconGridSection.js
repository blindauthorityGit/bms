import {defineType, defineField} from 'sanity'

export const iconGridSection = defineType({
  name: 'iconGridSection',
  title: 'Icon Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Offwhite', value: 'offwhite'},
          {title: 'Light Grey', value: 'light'},
        ],
        layout: 'radio',
      },
    }),
    // Headline split: prefix / highlight / suffix
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      description: 'z.B. "Die"',
    }),

    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      description: 'z.B. "5 Säulen"',
    }),

    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix',
      type: 'string',
      description: 'z.B. "des Konzeptes"',
    }),

    // optional: falls du später andere Farben willst
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      description: 'z.B. "#BE1622"',
      initialValue: '#BE1622',
    }),

    defineField({
      name: 'intro',
      title: 'Einleitung (optional)',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'items',
      title: 'Icons',
      type: 'array',
      of: [{type: 'iconItem'}],
      validation: (Rule) => Rule.required().min(3).warning('Empfohlen: 3–6 Elemente'),
    }),
  ],

  preview: {
    select: {
      prefix: 'headlinePrefix',
      highlight: 'headlineHighlight',
      suffix: 'headlineSuffix',
      items: 'items',
    },
    prepare({prefix, highlight, suffix, items}) {
      const title = [prefix, highlight, suffix].filter(Boolean).join(' ')
      return {
        title: title || 'Icon Grid',
        subtitle: items ? `${items.length} Icons` : 'Keine Icons',
      }
    },
  },
})
