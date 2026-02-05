import {defineType, defineField} from 'sanity'

export const iconBoxStep = defineType({
  name: 'iconBoxStep',
  title: 'Icon Box Step',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Nummer',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {number: 'number', text: 'text'},
    prepare({number, text}) {
      return {
        title: `${number ?? ''}`.trim() ? `Step ${number}` : 'Step',
        subtitle: text ? `${text.slice(0, 60)}…` : '',
      }
    },
  },
})
