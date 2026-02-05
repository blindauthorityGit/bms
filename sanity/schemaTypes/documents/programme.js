import {defineType, defineField} from 'sanity'

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
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

    // defineField({
    //   name: 'intro',
    //   title: 'CTA',
    //   type: 'ctaSection',
    //   group: 'sections',
    // }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'simpleText',
      group: 'sections',
    }),

    defineField({
      name: 'achtwochen',
      title: '8 Wochen Programm (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'coaching',
      title: '1:1 Coachung (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'workshops',
      title: 'Workshops & Events (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'about',
      title: 'Über mich',
      type: 'textImageSection',
      group: 'sections',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
