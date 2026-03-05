import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0]{
    title,
    "slug": slug.current,

    seo{
      metaTitle,
      metaDescription,
      noIndex,
      ogImage
    },

    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },

    iconGrid{
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      intro,
      items[]{
        title,
        description,
        icon{
          asset->{ _id, url, metadata{ lqip, dimensions{width,height} } }
        }
      }
    },

iconGridRef->{
  title,
  type,
  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      // falls icon ein image ist:
      icon{
        asset->{ _id, url, metadata{lqip, dimensions{width,height}} }
      }
    }
  }
},


    aboutTeaser{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
    },

    cta{
      text,
      buttonText,
      buttonLink{ type, internal, external }
    },

    waysSection{
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      intro,
      items[]{
        title,
        description,
        icon{
          asset->{ _id, url, metadata{ lqip, dimensions{width,height} } }
        }
      }
    },

    decoImage{
      background,
      maxWidth,
      paddingY,
      alt,
      caption,
      image{
        asset->{ _id, url, metadata{ lqip, dimensions{width,height} } }
      }
    },

    testimonials{
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      background,
      items[]->{
        _id,
        name,
        initials,
        defaultProgram,
        "snippet": coalesce(
          snippets[featured == true][0],
          snippets[0]
        ){
          variant,
          program,
          quote,
          text,
          rating
        }
      }
    },

blogSection{
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  background,
  mode,
  limit,
  buttonText,
  buttonLink{ type, internal, external },

  "categoryTitle": category->title,

  "posts": select(
    mode == "manual" => posts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readingTime,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      coverImage{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height} } }
      }
    },

    mode == "category" => *[
      _type == "post" &&
      defined(^.category) &&
      references(^.category._ref)
    ] | order(publishedAt desc)[0...12]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readingTime,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      coverImage{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height} } }
      }
    },

    []
  )
},

    bereitSection{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
    },

  }
`;

export const LONGEVITY_QUERY = groq`
  *[_type == "longevityProgramm" && _id == "longevityProgramm"][0]{
    title,
    "slug": slug.current,

    seo{
      metaTitle,
      metaDescription,
      noIndex,
      ogImage
    },

    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },

    introSection{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
    },

    cta{
      text,
      buttonText,
      buttonLink{ type, internal, external }
    },

     programmAblauf{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    cards[]{
      topline,
      title
    }
  },
  benefits{
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  highlightColor,
  bullets[]{
    mainline,
    subline
  }
},
    geignet{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
    },

      teilnahme{
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  highlightColor,
  bullets[]{
    mainline,
    subline
  }
},


iconGridRef->{
  title,
  type,
  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      // falls icon ein image ist:
      icon{
        asset->{ _id, url, metadata{lqip, dimensions{width,height}} }
      }
    }
  }
},


  }
`;

export const POST_BY_SLUG_QUERY = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  readingTime,
  excerpt,

  category->{
    _id,
    title,
    "slug": slug.current
  },

  coverImage{
    alt,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    }
  },

  body[] {
    ...,

    // Bild-Blöcke im Body
    _type == "image" => {
      ...,
      alt,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height } }
      }
    },

    // Icon-Boxes Block
    _type == "postIconBoxesBlock" => {
      ...,
      headline,
      showNumbers,
      items[]{
        _key,
        title,
        showNumbers,
        icon{
          alt,
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } }
        },
        steps[]{
          _key,
          number,
          text
        }
      }
    },

    // Callout Block
    _type == "postCalloutBlock" => {
      ...,
      background,
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external }
    }
  },

  seo{
    metaTitle,
    metaDescription,
    noIndex,
    ogImage{
      asset->{ _id, url, metadata{ dimensions{ width, height } } }
    }
  }
}
`;

export const RELATED_POSTS_QUERY = groq`
*[_type == "post" && defined(slug.current) && _id != $id
  && (!defined($catId) || category._ref == $catId)
] | order(publishedAt desc)[0...2]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage{
    alt,
    asset->{ _id, url, metadata{ lqip, dimensions{ width,height } } }
  }
}
`;

export const POSTS_INDEX_QUERY = groq`
*[_type == "post" && defined(slug.current)]
| order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,

  category->{
    title,
    "slug": slug.current
  },

  coverImage{
    alt,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    }
  }
}
`;

export const ABOUT_PAGE_QUERY = groq`
*[_type == "ueberMich"][0]{
  title,
  slug,

  seo{
    title,
    description,
    noIndex
  },


  hero{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    subline,
    image{
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt
    },
    cta{
      label,
      link
    }
  },


    intro{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
    },


  meinWeg{
    background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  sections[]{
    _key,
    _type,
    _type == "ausbildungenSection" => {
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,

      groups[]{
        _key,
        yearLabel,
        items[]{
          _key,
          text
        }
      }
    }

  },


  decoImage{
    image{
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt
    },
    position
  }
}
`;

export const COACHING_PAGE_QUERY = groq`
*[_type == "coaching"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },




geignet{
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  highlightColor,
    additionalHeadline,
  additionalSubline,
  bullets[]{
    mainline,
    subline
  }
    },


  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const SCHMERZTHERAPIE_PAGE_QUERY = groq`
*[_type == "schmerztherapie"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },



  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const TRAINING_PAGE_QUERY = groq`
*[_type == "individuellesTraining"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },



  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const MENTAL_PAGE_QUERY = groq`
*[_type == "mentalesCoaching"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },



  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const ENTSPANNUNG_PAGE_QUERY = groq`
*[_type == "entspannung"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },



  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const ERNAEHRUNG_PAGE_QUERY = groq`
*[_type == "ernaehrung"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

 
    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },


  text1{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  text2{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },


  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      icon{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  },



  cta{
    headline,
    text,
    buttonText,
    buttonLink
  }
}
`;

export const PROGRAMME_PAGE_QUERY = groq`
*[_type == "programme"][0]{
  title,
  slug,


  seo{
    title,
    description,
    noIndex
  },

    hero{
      headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
    },

      intro{
    headline,
    text,
    buttonText,
    buttonLink
  },


  intro{
    headline,
    text,
    buttonText,
    buttonLink
  },



  achtwochen{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  coaching{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },

  workshops{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  },
  about{
      background,
      order,
      headlinePrefix,
      headlineHighlight,
      headlineSuffix,
      highlightColor,
      description,
      showButton,
      buttonText,
      buttonLink{ type, internal, external },
      image{ asset->{ _id, url, metadata{ lqip, dimensions{width,height} } } },
      imageAlt,
      offset
  }
}
`;

export const LONGEVITY_PAGE_QUERY = groq`
*[_type == "longevity"][0]{
  title,
  slug,

  
  seo{
    title,
    description,
    noIndex
  },


  hero{
     headline,
      text,
      buttonText,
      buttonLink{ type, internal, external },
      image{
        alt,
        asset->{ _id, url, metadata{ lqip, dimensions{width,height}, palette } }
      }
  },


  introSection{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    description,
    showButton,
    buttonText,
    buttonLink,
    image{
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt
    },
    order,
    background,
    offset
  },


iconGridRef->{
  title,
  type,
  iconGrid{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,
    intro,
    items[]{
      _key,
      title,
      description,
      // falls icon ein image ist:
      icon{
        asset->{ _id, url, metadata{lqip, dimensions{width,height}} }
      }
    }
  }
},


  cta{
    headline,
    text,
    buttonText,
    buttonLink
  },


  benefits{
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  highlightColor,
  additionalHeadline,
  additionalSubline,
  bullets[]{
    mainline,
    subline
  }
  },

  programmAblauf{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    highlightColor,

    cards[]{
      _key,
      topline,
      title
    }
  },


  testimonials{
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    items[]{
      _key,
      name,
      text,
      image{
        asset->{ _id, url, metadata{ lqip, dimensions } },
        alt
      }
    }
  }
}
`;

export const EVENTS_INDEX_QUERY = groq`
*[_type == "event" && coalesce(isActive, true) == true]
| order(isFeatured desc, dates[0].start asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  isFeatured,
  excerpt,

  // "nächster Termin" fürs Listing (du kannst daraus Monat/Jahr + Uhrzeit bauen)
  "nextDate": dates[0]{
    start,
    end,
    label,
    note,
    isSoldOut
  },

  coverImage{
    alt,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    }
  }
}
`;

/* ------------------------------
   Workshops / Events – DETAIL
-------------------------------- */
export const EVENT_DETAIL_QUERY = groq`
*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  heroSubline,

  coverImage{
    alt,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    }
  },

  body[]{
    ...,
    _type == "image" => {
      ...,
      alt,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height } }
      }
    }
  },

  dates[]{
    _key,
    start,
    end,
    label,
    note,
    isSoldOut
  } | order(start asc),

  location{
    name,
    address,
    city,
    mapLink
  },

  price{
    amount,
    currency,
    note
  },

  signup{
    buttonText,
    buttonLink{
      ...,
      // falls du deinen link-type so nutzt: internal ref + slug
      internalRef->{
        _type,
        "slug": slug.current,
        title
      }
    },
    helperText
  },

  gallery[]{
    _key,
    alt,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ width, height } }
    }
  },

  seo
}
`;

/* ------------------------------
   OPTIONAL: "Weitere Events" für Detailseite
   (ohne aktuelles Event, gleiche Kategorie bevorzugt)
-------------------------------- */
export const EVENT_RELATED_QUERY = groq`
*[_type == "event" && coalesce(isActive, true) == true && slug.current != $slug]
| order(dates[0].start asc, _createdAt desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  "nextDate": dates[0]{ start, end, isSoldOut },
  coverImage{
    alt,
    asset->{ _id, url, metadata{lqip, dimensions{width,height}} }
  }
}
`;

export const WEEKLY_SCHEDULE_QUERY = groq`
*[_type == "weeklySchedule"][0]{
  _id,
  title,
  weekLabel,
  note,

  courses[]{
    _key,
    day,
    title,
    time,
    description,
    status
  } | order(day asc)
}
`;

export const YOGA_QUERY = `
*[_type == "yoga"][0]{
  title,
  slug,
  seo,

  hero{
    headline,
    text,
    buttonText,
    buttonLink{
      type,
      internal,
      external
    },
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  },

  section1{
    ...,
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  },

  section2{
    ...,
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  },

  section3{
    ...,
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  },

  section4{
    ...,
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  },

  section5{
    ...,
    image{
      alt,
      asset->{
        _id,
        url
      }
    }
  }
}
`;
