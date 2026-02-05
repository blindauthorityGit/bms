import {defineType, defineField} from 'sanity'

export const postCalloutBlock = defineType({
  name: 'postCalloutBlock',
  title: 'Highlight Bereich (Background)',
  type: 'object',
  fields: [
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      initialValue: 'offwhite',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Offwhite', value: 'offwhite'},
          {title: 'Light', value: 'light'},
          {title: 'Primary (Rot)', value: 'primary'},
        ],
        layout: 'radio',
      },
    }),

    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'headline', subtitle: 'background'},
    prepare({title, subtitle}) {
      return {title: title || 'Highlight Bereich', subtitle}
    },
  },
})
