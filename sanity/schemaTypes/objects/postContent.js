import {defineType} from 'sanity'

export const postContent = defineType({
  name: 'postContent',
  title: 'Post Inhalt',
  type: 'array',
  of: [
    // Standard Text
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Zitat', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [{name: 'link', type: 'link'}],
      },
    },

    // Bild im Inhalt
    {
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
    },

    // Icon-Boxes Block (wie im Design)
    {type: 'postIconBoxesBlock'},

    // Highlight / Special Bereich mit Background + Button
    {type: 'postCalloutBlock'},
  ],
})
