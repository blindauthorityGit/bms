import {defineType, defineField} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Link-Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Intern', value: 'internal'},
          {title: 'Extern', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'internal',
      title: 'Interner Pfad',
      type: 'string',
      description: 'z.B. "/", "/longevity", "/kontakt"',
      hidden: ({parent}) => parent?.type !== 'internal',
      // validation: (Rule) =>
      //   Rule.custom((val, ctx) => {
      //     const p = ctx?.parent;
      //     if (p?.type !== "internal") return true;
      //     if (!val) return "Bitte internen Pfad angeben.";
      //     if (!val.startsWith("/")) return 'Interner Pfad muss mit "/" beginnen.';
      //     return true;
      //   }),
    }),

    defineField({
      name: 'external',
      title: 'Externe URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
      // validation: (Rule) =>
      //   Rule.custom((val, ctx) => {
      //     const p = ctx?.parent;
      //     if (p?.type !== "external") return true;
      //     if (!val) return "Bitte externe URL angeben.";
      //     return true;
      //   }),
    }),
  ],

  preview: {
    select: {type: 'type', internal: 'internal', external: 'external'},
    prepare({type, internal, external}) {
      return {
        title: type === 'internal' ? internal : external,
        subtitle: type === 'internal' ? 'Intern' : 'Extern',
      }
    },
  },
})
