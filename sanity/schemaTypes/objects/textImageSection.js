import {defineType, defineField} from 'sanity'

export const textImageSection = defineType({
  name: 'textImageSection',
  title: 'Text + Image Section',
  type: 'object',
  fields: [
    // Background
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Offwhite', value: 'offwhite'},
          {title: 'Light Grey', value: 'light'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'order',
      title: 'Layout – Bild / Text Reihenfolge',
      type: 'string',
      initialValue: 'imageRight',
      options: {
        list: [
          {title: 'Bild rechts / Text links (Default)', value: 'imageRight'},
          {title: 'Bild links / Text rechts', value: 'imageLeft'},
        ],
        layout: 'radio',
      },
    }),

    // Headline split
    defineField({
      name: 'headlinePrefix',
      title: 'Headline – Prefix',
      type: 'string',
      description: 'z.B. "Ich bin"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline – Highlight',
      type: 'string',
      description: 'z.B. "Tanja Bauer"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineSuffix',
      title: 'Headline – Suffix (optional)',
      type: 'string',
      description: 'z.B. "" (leer lassen wenn nicht benötigt)',
    }),

    defineField({
      name: 'highlightColor',
      title: 'Highlight Farbe (optional)',
      type: 'string',
      description: 'z.B. "#BE1622"',
      initialValue: '#BE1622',
    }),

    // Rich text description
    defineField({
      name: 'description',
      title: 'Description (Rich Text)',
      type: 'richText',
      validation: (Rule) => Rule.required(),
    }),

    // Button
    // Button
    defineField({
      name: 'showButton',
      title: 'Button anzeigen?',
      type: 'boolean',
      initialValue: false, // ✅ empfehlung: lieber false default
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text (optional)',
      type: 'string',
      hidden: ({parent}) => !parent?.showButton,
      // ✅ keine validation
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link (optional)',
      type: 'link',
      hidden: ({parent}) => !parent?.showButton,
      // ✅ keine validation
    }),

    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Offset
    defineField({
      name: 'offset',
      title: 'Image Offset',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Offset nach oben', value: 'up'},
          {title: 'Offset nach unten', value: 'down'},
        ],
        layout: 'radio',
      },
      description: 'Damit das Bild leicht über die Section-Grenze überlappt (wie im Design).',
    }),
  ],

  preview: {
    select: {
      prefix: 'headlinePrefix',
      highlight: 'headlineHighlight',
      suffix: 'headlineSuffix',
      media: 'image',
    },
    prepare({prefix, highlight, suffix, media}) {
      const title = [prefix, highlight, suffix].filter(Boolean).join(' ')
      return {
        title: title || 'Text + Image Section',
        media,
      }
    },
  },
})
