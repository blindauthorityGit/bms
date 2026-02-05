import {defineType, defineField} from 'sanity'

export const longevityProgramm = defineType({
  name: 'longevityProgramm',
  title: 'Longevity Programm',
  type: 'document',

  // Tabs / Gruppen
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero'},
    {name: 'sections', title: 'Sections'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Home',
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
      group: 'basics',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'programmAblauf',
      title: 'Programm Ablauf',
      type: 'programmAblaufSection',
      group: 'sections',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits (Was das Programm bewirkt)',
      type: 'benefitsSection',
      group: 'sections',
    }),
    defineField({
      name: 'geignet',
      title: 'Für wen geeignet (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'teilnahme',
      title: 'Teilnahme (Was das Programm bewirkt)',
      type: 'benefitsSection',
      group: 'sections',
    }),
    defineField({
      name: 'iconGridRef',
      title: 'Icon Grid (Reusable)',
      type: 'reference',
      to: [{type: 'reusableSection'}],
      options: {filter: 'type == "iconGrid"'},
      group: 'sections',
    }),

    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'ctaSection',
      group: 'sections',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
