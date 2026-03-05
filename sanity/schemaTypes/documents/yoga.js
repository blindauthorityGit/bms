// /sanity/schemas/documents/yoga.js
import {defineType, defineField} from 'sanity'

export const yoga = defineType({
  name: 'yoga',
  title: 'Yoga',
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
      initialValue: 'Yoga',
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

    // =========================
    // 4x Text-Image Sections
    // =========================

    defineField({
      name: 'section2',
      title: 'Text/Image Section 2',
      type: 'textImageSection',
      group: 'sections',
    }),

    defineField({
      name: 'section3',
      title: 'Text/Image Section 3',
      type: 'textImageSection',
      group: 'sections',
    }),

    defineField({
      name: 'section4',
      title: 'Text/Image Section 4',
      type: 'textImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'section5',
      title: 'Text/Image Section 5',
      type: 'textImageSection',
      group: 'sections',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
