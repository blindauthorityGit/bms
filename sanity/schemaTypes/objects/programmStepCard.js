import {defineType, defineField} from 'sanity'

export const programmStepCard = defineType({
  name: 'programmStepCard',
  title: 'Programm – Step Card',
  type: 'object',
  fields: [
    defineField({
      name: 'topline',
      title: "Topline (z.B. 'Woche 1')",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: "Titel (z.B. 'Start & Ziele')",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {topline: 'topline', title: 'title'},
    prepare({topline, title}) {
      return {
        title: title || 'Step Card',
        subtitle: topline || '',
      }
    },
  },
})
