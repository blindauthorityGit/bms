import {defineType, defineField} from 'sanity'

export const mentalesCoaching = defineType({
  name: 'mentalesCoaching',
  title: 'mentales Coaching',
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
      name: 'text1',
      title: 'Text 1 (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'text2',
      title: 'Text 2 (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),

    defineField({
      name: 'iconGrid',
      title: 'Die Vorteile',
      type: 'iconGridSection',
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
