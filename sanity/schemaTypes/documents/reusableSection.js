import {defineType, defineField} from 'sanity'

const SECTION_TYPES = [
  {title: 'Icon Grid', value: 'iconGrid'},
  {title: 'Benefits (Bullets)', value: 'benefits'},
  {title: 'Programm Ablauf (8 Wochen)', value: 'programmAblauf'},
  // später: FAQ, Testimonials, etc.
]

export const reusableSection = defineType({
  name: 'reusableSection',
  title: 'Reusable Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Interner Name',
      type: 'string',
      description: 'z.B. "Home – 5 Säulen"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Section Typ',
      type: 'string',
      options: {list: SECTION_TYPES, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),

    // === Content Blocks (nur eins ist sichtbar, je nach type) ===
    defineField({
      name: 'iconGrid',
      title: 'Icon Grid Content',
      type: 'iconGridSection',
      hidden: ({parent}) => parent?.type !== 'iconGrid',
    }),

    defineField({
      name: 'benefits',
      title: 'Benefits Content',
      type: 'benefitsSection',
      hidden: ({parent}) => parent?.type !== 'benefits',
    }),

    defineField({
      name: 'programmAblauf',
      title: 'Programm Ablauf Content',
      type: 'programmAblaufSection',
      hidden: ({parent}) => parent?.type !== 'programmAblauf',
    }),
  ],

  preview: {
    select: {title: 'title', type: 'type'},
    prepare({title, type}) {
      return {title, subtitle: type}
    },
  },
})
