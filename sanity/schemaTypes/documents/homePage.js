import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
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
      name: 'iconGrid',
      title: 'Die 5 Säulen',
      type: 'iconGridSection',
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
      name: 'aboutTeaser',
      title: 'About Teaser (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),

    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'ctaSection',
      group: 'sections',
    }),

    defineField({
      name: 'waysSection',
      title: '3 Wege Section',
      type: 'iconBoxesSection',
      group: 'sections',
    }),
    defineField({
      name: 'decoImage',
      title: 'Deco Image',
      type: 'decoImageSection',
      group: 'sections',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'testimonialsSection',
      group: 'sections',
    }),
    defineField({
      name: 'blogSection',
      title: 'Blog Section',
      type: 'blogSection',
      group: 'sections',
    }),
    defineField({
      name: 'bereitSection',
      title: 'Breit Section (Text + Image)',
      type: 'textImageSection',
      group: 'sections',
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
