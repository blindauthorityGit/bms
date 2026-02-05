// /sanity/schemas/objects/eventDate.js
import {defineType, defineField} from 'sanity'

export const eventDate = defineType({
  name: 'eventDate',
  title: 'Termin',
  type: 'object',
  fields: [
    defineField({
      name: 'start',
      title: 'Beginn',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'Ende (optional)',
      type: 'datetime',
    }),
    defineField({
      name: 'label',
      title: 'Label (optional)',
      type: 'string',
      description: 'z.B. "Sonntag", "Zusatztermin", etc.',
    }),
    defineField({
      name: 'note',
      title: 'Hinweis (optional)',
      type: 'string',
      description: 'z.B. "Bitte 10 Min früher da sein"',
    }),
    defineField({
      name: 'isSoldOut',
      title: 'Ausgebucht',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {start: 'start', end: 'end', label: 'label', soldOut: 'isSoldOut'},
    prepare({start, end, label, soldOut}) {
      const s = start ? new Date(start) : null
      const e = end ? new Date(end) : null
      const date = s ? s.toLocaleDateString('de-DE') : 'ohne Datum'
      const time =
        s && (e || true)
          ? `${s.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})}${
              e ? `–${e.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})}` : ''
            }`
          : ''
      return {
        title: `${soldOut ? '⛔ ' : ''}${date} ${time}`.trim(),
        subtitle: label || '',
      }
    },
  },
})
