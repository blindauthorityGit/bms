import {defineType, defineField} from 'sanity'

export const courseItem = defineType({
  name: 'courseItem',
  title: 'Termin',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          {title: 'Montag', value: 'mon'},
          {title: 'Dienstag', value: 'tue'},
          {title: 'Mittwoch', value: 'wed'},
          {title: 'Donnerstag', value: 'thu'},
          {title: 'Freitag', value: 'fri'},
          {title: 'Samstag', value: 'sat'},
          {title: 'Sonntag', value: 'sun'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'time',
      title: 'Uhrzeit',
      type: 'string',
      description: 'z.B. 9.00–10.15 Uhr',
    }),

    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Kurs entfällt', value: 'cancelled'},
        ],
      },
      initialValue: 'normal',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      day: 'day',
      time: 'time',
    },
    prepare({title, day, time}) {
      return {
        title,
        subtitle: `${day} • ${time}`,
      }
    },
  },
})
