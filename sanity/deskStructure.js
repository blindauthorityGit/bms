export default (S) =>
  S.list()
    .title('Content')
    .items([
      /* =====================
         PAGES (Singletons)
      ===================== */
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .child(S.document().schemaType('homePage').documentId('homePage')),

              S.listItem()
                .title('Longevity Programm')
                .child(
                  S.document().schemaType('longevityProgramm').documentId('longevityProgramm'),
                ),

              S.listItem()
                .title('Longevity')
                .child(S.document().schemaType('longevity').documentId('longevity')),

              S.listItem()
                .title('Coaching')
                .child(S.document().schemaType('coaching').documentId('coaching')),

              S.listItem()
                .title('Programme')
                .child(S.document().schemaType('programme').documentId('programme')),

              S.listItem()
                .title('Über mich')
                .child(S.document().schemaType('ueberMich').documentId('ueberMich')),
              S.listItem()
                .title('Schmerztherapie')
                .child(S.document().schemaType('schmerztherapie').documentId('schmerztherapie')),
              S.listItem()
                .title('Individuelles Training')
                .child(
                  S.document()
                    .schemaType('individuellesTraining')
                    .documentId('individuellesTraining'),
                ),
              S.listItem()
                .title('mentales Coaching')
                .child(S.document().schemaType('mentalesCoaching').documentId('mentalesCoaching')),
              S.listItem()
                .title('Entspannung')
                .child(S.document().schemaType('entspannung').documentId('entspannung')),
              S.listItem()
                .title('Ernährung')
                .child(S.document().schemaType('ernaehrung').documentId('ernaehrung')),
            ]),
        ),

      S.divider(),

      /* =====================
         EVERYTHING ELSE
      ===================== */
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'longevityProgramm',
            'longevity',
            'coaching',
            'programme',
            'ueberMich',
            'schmerztherapie',
            'individuellesTraining',
            'mentalesCoaching',
            'entspannung',
            'ernaehrung',
          ].includes(listItem.getId()),
      ),
    ])
