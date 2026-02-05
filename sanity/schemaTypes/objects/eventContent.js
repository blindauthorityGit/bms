// /sanity/schemas/objects/eventContent.js
import {defineType} from 'sanity'

export const eventContent = defineType({
  name: 'eventContent',
  title: 'Event Inhalt',
  type: 'array',
  of: [
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
    {
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
    },

    // Optional: wenn du dieselben Blöcke wie bei Posts willst:
    // { type: "postCalloutBlock" },
    // { type: "postIconBoxesBlock" },
  ],
})
