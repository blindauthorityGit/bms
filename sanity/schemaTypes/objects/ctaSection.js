import {defineType, defineField} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Kurz & prägnant (kann auch länger sein, Zeilenumbruch macht Frontend).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'text'},
    prepare({title}) {
      return {
        title: 'CTA',
        subtitle: title || '',
      }
    },
  },
})
