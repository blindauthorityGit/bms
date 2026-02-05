// /sanity/schemas/objects/eventSignup.js
import {defineType, defineField} from 'sanity'

export const eventSignup = defineType({
  name: 'eventSignup',
  title: 'Anmeldung',
  type: 'object',
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Jetzt anmelden',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'link', // nutzt deinen bestehenden link-type (internal/external)
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'helperText',
      title: 'Text darunter (optional)',
      type: 'string',
      description: 'z.B. "Kostenloses Erstgespräch" / "Plätze begrenzt"',
    }),
  ],
})
