import {defineType, defineField} from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',

  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      initialValue: 'Erfahrungen',
    }),

    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      initialValue: 'unserer',
    }),

    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix',
      type: 'string',
      initialValue: 'Teilnehmer',
    }),

    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      initialValue: 'offwhite',
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
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'testimonial'}],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Testimonials Section',
      }
    },
  },
})
