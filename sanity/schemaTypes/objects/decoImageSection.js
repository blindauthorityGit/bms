import {defineType, defineField} from 'sanity'

export const decoImageSection = defineType({
  name: 'decoImageSection',
  title: 'Deco Image',
  type: 'object',
  fields: [
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Offwhite', value: 'offwhite'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      initialValue: 'container',
      options: {
        list: [
          {title: 'Container (1440)', value: 'container'},
          {title: 'Narrow (1100)', value: 'narrow'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Optional – wenn leer, nimmt Frontend fallback.',
    }),

    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),

    defineField({
      name: 'paddingY',
      title: 'Vertical Padding',
      type: 'string',
      initialValue: 'md',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
        layout: 'radio',
      },
    }),
  ],

  preview: {
    select: {media: 'image', caption: 'caption'},
    prepare({media, caption}) {
      return {
        title: 'Deco Image',
        subtitle: caption || '',
        media,
      }
    },
  },
})
