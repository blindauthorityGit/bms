import {defineType, defineField} from 'sanity'

export const programmAblaufSection = defineType({
  name: 'programmAblaufSection',
  title: 'Programm – Ablauf (8-Wochen)',
  type: 'object',
  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      description: 'z.B. "So läuft es ab"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      description: 'z.B. "(8-Wochen-Programm)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix (optional)',
      type: 'string',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      initialValue: '#BE1622',
      description: 'z.B. "#BE1622"',
    }),

    defineField({
      name: 'cards',
      title: 'Step Cards (8 Stück empfohlen)',
      type: 'array',
      of: [{type: 'programmStepCard'}],
      validation: (Rule) => Rule.min(1).warning('Bitte mindestens 1 Card anlegen.'),
    }),
  ],
  preview: {
    select: {
      prefix: 'headlinePrefix',
      highlight: 'headlineHighlight',
      count: 'cards.length',
    },
    prepare({prefix, highlight, count}) {
      return {
        title: `${prefix || 'Ablauf'} ${highlight || ''}`.trim(),
        subtitle: `${count || 0} Cards`,
      }
    },
  },
})
