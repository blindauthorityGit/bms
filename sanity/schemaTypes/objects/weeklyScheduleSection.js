import {defineType, defineField} from 'sanity'

export const weeklyScheduleSection = defineType({
  name: 'weeklyScheduleSection',
  title: 'Wochenplan Section',
  type: 'object',

  fields: [
    defineField({
      name: 'schedule',
      title: 'Wochenplan auswählen',
      type: 'reference',
      to: [{type: 'weeklySchedule'}],
    }),
  ],
})
