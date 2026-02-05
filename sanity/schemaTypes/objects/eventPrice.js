// /sanity/schemas/objects/eventPrice.js
import {defineType, defineField} from 'sanity'

export const eventPrice = defineType({
  name: 'eventPrice',
  title: 'Preis',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Betrag',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Währung',
      type: 'string',
      initialValue: 'EUR',
      options: {list: ['EUR', 'CHF', 'USD']},
    }),
    defineField({
      name: 'note',
      title: 'Hinweis (optional)',
      type: 'string',
      description: 'z.B. "pro Person" / "inkl. Getränke"',
    }),
  ],
})
