import {defineType, defineField} from 'sanity'

export const benefitBullet = defineType({
  name: 'benefitBullet',
  title: 'Benefit Bullet',
  type: 'object',
  fields: [
    defineField({
      name: 'mainline',
      title: 'Mainline',
      type: 'string',
      description: 'z.B. "Mehr Energie im Alltag:"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subline',
      title: 'Subline (optional)',
      type: 'string',
      description: 'z.B. "durch bewusste Bewegung und Ernährung"',
    }),
  ],
  preview: {
    select: {title: 'mainline', subtitle: 'subline'},
  },
})
