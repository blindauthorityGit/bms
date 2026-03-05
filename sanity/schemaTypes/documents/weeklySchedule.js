import {defineType, defineField} from 'sanity'

export const weeklySchedule = defineType({
  name: 'weeklySchedule',
  title: 'Wochenplan',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Wochenplan',
    }),

    defineField({
      name: 'weekLabel',
      title: 'Wochenüberschrift',
      type: 'string',
      description: 'z.B. "Yoga vom 2. bis 8. März 2026"',
    }),

    defineField({
      name: 'courses',
      title: 'Termine',
      type: 'array',
      of: [{type: 'courseItem'}],
    }),

    defineField({
      name: 'note',
      title: 'Hinweistext',
      type: 'text',
      description: 'Text unter dem Kalender',
    }),
  ],
})
