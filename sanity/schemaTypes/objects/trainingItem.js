// /sanity/schemas/objects/trainingItem.js
import {defineType, defineField} from 'sanity'

export const trainingItem = defineType({
  name: 'trainingItem',
  title: 'Ausbildungs-Eintrag',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text'},
    prepare({title}) {
      return {title: title || 'Eintrag'}
    },
  },
})
