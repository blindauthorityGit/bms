// /sanity/schemas/objects/eventLocation.js
import {defineType, defineField} from 'sanity'

export const eventLocation = defineType({
  name: 'eventLocation',
  title: 'Ort',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name (optional)', type: 'string'}),
    defineField({name: 'address', title: 'Adresse (optional)', type: 'text', rows: 2}),
    defineField({name: 'city', title: 'Ort/PLZ (optional)', type: 'string'}),
    defineField({name: 'mapLink', title: 'Google Maps Link (optional)', type: 'url'}),
  ],
})
