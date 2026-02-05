import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial (Case)',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'initials',
      title: 'Initialen',
      type: 'string',
      description: 'z. B. „DB“',
      validation: (Rule) => Rule.required().max(3).warning('Max. 3 Zeichen empfohlen'),
    }),

    defineField({
      name: 'defaultProgram',
      title: 'Standard-Programm / Kontext (optional)',
      type: 'string',
      description: 'Wird genutzt, wenn ein Snippet kein eigenes Programm hat.',
    }),

    defineField({
      name: 'snippets',
      title: 'Testimonials (Snippets)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialSnippet',
          title: 'Snippet',
          fields: [
            defineField({
              name: 'variant',
              title: 'Variante',
              type: 'string',
              description: 'Hilft dir, passende Quotes je nach Stelle auszuwählen.',
              options: {
                list: [
                  {title: 'Schmerz / Ausgangslage', value: 'problem'},
                  {title: 'Wendepunkt', value: 'turningPoint'},
                  {title: 'Ergebnis / Nutzen', value: 'result'},
                  {title: 'Haltung / Zukunft', value: 'mindset'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'program',
              title: 'Programm / Kontext (optional)',
              type: 'string',
              description: 'Überschreibt Standard-Programm, falls gesetzt.',
            }),

            defineField({
              name: 'quote',
              title: 'Zitat',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'text',
              title: 'Kurztext (1–2 Zeilen)',
              type: 'text',
              rows: 3,
              description: 'Mini-Text unter dem Zitat (optional, aber empfohlen).',
            }),

            defineField({
              name: 'rating',
              title: 'Bewertung',
              type: 'number',
              initialValue: 5,
              validation: (Rule) => Rule.min(1).max(5),
            }),

            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              description: 'Markiert den Haupt-Quote (z. B. für Homepage Default).',
              initialValue: false,
            }),
          ],

          preview: {
            select: {
              variant: 'variant',
              quote: 'quote',
              program: 'program',
              featured: 'featured',
            },
            prepare({variant, quote, program, featured}) {
              const labelMap = {
                problem: 'Problem',
                turningPoint: 'Wendepunkt',
                result: 'Ergebnis',
                mindset: 'Haltung',
              }

              return {
                title: `${featured ? '⭐ ' : ''}${labelMap[variant] || variant}`,
                subtitle:
                  (program ? `${program} — ` : '') + (quote ? `${quote.slice(0, 80)}…` : ''),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Mindestens 1 Snippet empfohlen'),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'defaultProgram',
    },
  },
})
