import {defineType, defineField} from 'sanity'

export const benefitsSection = defineType({
  name: 'benefitsSection',
  title: 'Benefits Section (Headline + Bullets)',
  type: 'object',
  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      description: 'z.B. "Was das Programm"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      description: 'z.B. "bewirkt"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix (optional)',
      type: 'string',
      description: 'z.B. ""',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      initialValue: '#BE1622',
      description: 'z.B. "#BE1622"',
    }),

    defineField({
      name: 'additionalHeadline',
      title: 'Additional Headline',
      type: 'string',
      description: 'z.B. ""',
    }),
    defineField({
      name: 'additionalSubline',
      title: 'Additional Subline',
      type: 'string',
      description: 'z.B. ""',
    }),

    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'benefitBullet'}],
      validation: (Rule) => Rule.min(1).warning('Bitte mindestens 1 Bullet anlegen.'),
    }),
  ],
  preview: {
    select: {
      prefix: 'headlinePrefix',
      highlight: 'headlineHighlight',
      count: 'bullets.length',
    },
    prepare({prefix, highlight, count}) {
      return {
        title: `${prefix || 'Benefits'} ${highlight || ''}`.trim(),
        subtitle: `${count || 0} Bullets`,
      }
    },
  },
})
