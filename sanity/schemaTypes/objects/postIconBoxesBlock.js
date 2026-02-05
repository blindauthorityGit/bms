import {defineType, defineField} from 'sanity'

export const postIconBoxesBlock = defineType({
  name: 'postIconBoxesBlock',
  title: 'Icon Boxes',
  type: 'object',

  fieldsets: [
    {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: false}},
    {name: 'settings', title: 'Einstellungen', options: {collapsible: true, collapsed: true}},
  ],

  fields: [
    // Headline
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      fieldset: 'headline',
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      fieldset: 'headline',
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix',
      type: 'string',
      fieldset: 'headline',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      description: 'z.B. #B21F24',
      fieldset: 'headline',
    }),

    // Settings
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
      fieldset: 'settings',
    }),

    defineField({
      name: 'showNumbers',
      title: 'Nummern anzeigen (global)',
      type: 'boolean',
      initialValue: true,
      fieldset: 'settings',
    }),

    // Items
    defineField({
      name: 'items',
      title: 'Boxen',
      type: 'array',
      of: [{type: 'postIconBoxItem'}],
      validation: (Rule) => Rule.min(1).max(6).required(),
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
      const h = [prefix, highlight, suffix].filter(Boolean).join(' ')
      const count = items?.length || 0
      return {
        title: h ? `Icon Boxes: ${h}` : 'Icon Boxes',
        subtitle: count ? `${count} Boxen` : 'Keine Boxen',
      }
    },
  },
})
