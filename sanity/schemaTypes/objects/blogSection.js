import {defineType, defineField} from 'sanity'

export const blogSection = defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'object',
  fields: [
    defineField({name: 'headlinePrefix', title: 'Headline – Prefix', type: 'string'}),
    defineField({name: 'headlineHighlight', title: 'Headline – Highlight', type: 'string'}),
    defineField({name: 'headlineSuffix', title: 'Headline – Suffix', type: 'string'}),

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
      name: 'mode',
      title: 'Inhalt',
      type: 'string',
      initialValue: 'manual',
      options: {
        list: [
          {title: 'Manuell auswählen', value: 'manual'},
          {title: 'Automatisch (Kategorie)', value: 'category'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'category',
      title: 'Kategorie (für Automatik)',
      type: 'reference',
      to: [{type: 'postCategory'}],
      hidden: ({parent}) => parent?.mode !== 'category',
    }),

    defineField({
      name: 'limit',
      title: 'Anzahl Beiträge',
      type: 'number',
      initialValue: 2,
      validation: (Rule) => Rule.min(1).max(6),
      hidden: ({parent}) => parent?.mode !== 'category',
    }),

    defineField({
      name: 'posts',
      title: 'Beiträge (manuell)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      hidden: ({parent}) => parent?.mode !== 'manual',
    }),

    defineField({
      name: 'buttonText',
      title: 'Button Text (unten)',
      type: 'string',
      initialValue: 'Alle Beiträge',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'link',
    }),
  ],

  preview: {
    select: {title: 'headlineHighlight', subtitle: 'mode'},
    prepare({title, subtitle}) {
      return {title: title ? `Blog Section: ${title}` : 'Blog Section', subtitle}
    },
  },
})
