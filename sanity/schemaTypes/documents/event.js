// /sanity/schemas/documents/event.js
import {defineType, defineField} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Workshop / Event',
  type: 'document',

  groups: [
    {name: 'content', title: 'Inhalt', default: true},
    {name: 'dates', title: 'Termine'},
    {name: 'media', title: 'Medien'},
    {name: 'meta', title: 'Meta'},
    {name: 'seo', title: 'SEO'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),

    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung (für Cards)',
      type: 'text',
      rows: 3,
      description: 'Wird in der Übersicht unter dem Titel angezeigt.',
      validation: (Rule) => Rule.max(240),
      group: 'content',
    }),

    defineField({
      name: 'category',
      title: 'Kategorie/Tag (Badge)',
      type: 'string',
      description: 'z.B. "Bewegung", "Entspannung", "Workshop"',
      group: 'meta',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured (oben anzeigen)',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),

    defineField({
      name: 'isActive',
      title: 'Aktiv / anzeigen',
      type: 'boolean',
      initialValue: true,
      group: 'meta',
    }),

    // HERO / Cover
    defineField({
      name: 'coverImage',
      title: 'Hero / Cover Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'heroSubline',
      title: 'Hero Subline (optional)',
      type: 'string',
      description: 'z.B. kurzer Teaser unter dem Titel',
      group: 'content',
    }),

    // Haupttext (Portable Text)
    defineField({
      name: 'body',
      title: 'Text / Inhalt',
      type: 'eventContent',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // Location / Preis / Infos
    defineField({
      name: 'location',
      title: 'Ort',
      type: 'eventLocation',
      group: 'content',
    }),

    defineField({
      name: 'price',
      title: 'Preis (optional)',
      type: 'eventPrice',
      group: 'content',
    }),

    defineField({
      name: 'signup',
      title: 'Anmelde Button',
      type: 'eventSignup',
      group: 'content',
    }),

    // Termine
    defineField({
      name: 'dates',
      title: 'Termine',
      type: 'array',
      of: [{type: 'eventDate'}],
      //   validation: (Rule) => Rule.min(1).required(),
      group: 'dates',
    }),

    // Galerie optional
    defineField({
      name: 'gallery',
      title: 'Bildergalerie (optional)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        },
      ],
      group: 'media',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      dates: 'dates',
      active: 'isActive',
    },
    prepare({title, subtitle, media, dates, active}) {
      const nextDate = Array.isArray(dates) && dates.length ? dates[0] : null
      const hint = nextDate?.start
        ? `• nächster Termin: ${new Date(nextDate.start).toLocaleDateString('de-DE')}`
        : ''
      return {
        title: `${active === false ? '⛔ ' : ''}${title || 'Event'}`,
        subtitle: `${subtitle || 'Workshop/Event'} ${hint}`.trim(),
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Featured zuerst, dann nächster Termin',
      name: 'featuredThenDateAsc',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'dates.0.start', direction: 'asc'},
      ],
    },
  ],
})
