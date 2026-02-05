import {defineType, defineField} from 'sanity'

export const ueberMich = defineType({
  name: 'ueberMich',
  title: 'Über mich',
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
      name: 'intro',
      title: 'Intro Section',
      type: 'textImageSection',
      group: 'sections',
    }),

    defineField({
      name: 'meinWeg',
      title: 'Mein Weg (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'ausbildungenSection'},
        // ...deine anderen Sections
      ],
      group: 'sections',
    }),

    defineField({
      name: 'decoImage',
      title: 'Deco Image',
      type: 'decoImageSection',
      group: 'sections',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
