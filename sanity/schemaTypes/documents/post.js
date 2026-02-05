import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  groups: [
    {name: 'content', title: 'Inhalt', default: true},
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
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{type: 'postCategory'}],
      group: 'meta',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Datum',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'meta',
    }),

    defineField({
      name: 'readingTime',
      title: 'Lesezeit (Minuten)',
      type: 'number',
      description: 'Optional – kann später auch automatisch berechnet werden.',
      validation: (Rule) => Rule.min(1).max(60),
      group: 'meta',
    }),

    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung (Preview)',
      type: 'text',
      rows: 3,
      description: 'Wird in Karten/Listen angezeigt (Home, Blog-Übersicht).',
      validation: (Rule) => Rule.max(240).warning('Für Cards besser < 200 Zeichen.'),
      group: 'content',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover / Preview Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
      group: 'content',
    }),

    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'postContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

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
      subtitle: 'category.title',
      media: 'coverImage',
    },
  },

  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
