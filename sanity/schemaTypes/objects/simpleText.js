import {defineType, defineField} from 'sanity'

export const simpleText = defineType({
  name: 'simpleText',
  title: 'Simple Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Kurz & prägnant (kann auch länger sein, Zeilenumbruch macht Frontend).',
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
