// /sanity/schemas/sections/ausbildungenSection.js
import {defineType, defineField} from 'sanity'

export const ausbildungenSection = defineType({
  name: 'ausbildungenSection',
  title: 'Ausbildungen Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      description: 'z.B. "Meine"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      description: 'z.B. "Ausbildungen"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix (optional)',
      type: 'string',
      description: 'z.B. ""',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      initialValue: '#BE1622',
    }),

    defineField({
      name: 'groups',
      title: 'Jahre / Zeiträume',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'trainingGroup',
          title: 'Zeitraum',
          fields: [
            defineField({
              name: 'yearLabel',
              title: 'Jahr / Zeitraum',
              type: 'string',
              description: 'z.B. "2014 – 2015" oder "2020"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Bullets',
              type: 'array',
              of: [{type: 'trainingItem'}],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'yearLabel', items: 'items'},
            prepare({title, items}) {
              return {
                title: title || 'Zeitraum',
                subtitle: items?.length ? `${items.length} Einträge` : 'Keine Einträge',
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      prefix: 'headlinePrefix',
      highlight: 'headlineHighlight',
      suffix: 'headlineSuffix',
      groups: 'groups',
    },
    prepare({prefix, highlight, suffix, groups}) {
      const title = [prefix, highlight, suffix].filter(Boolean).join(' ')
      return {
        title: title || 'Ausbildungen',
        subtitle: groups?.length ? `${groups.length} Zeiträume` : 'Keine Zeiträume',
      }
    },
  },
})
