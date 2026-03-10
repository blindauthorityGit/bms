export function buildMetadata({
    seo = {},
    title,
    description,
    pathname = "",
    siteName = "Body Soul Mind",
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    defaultTitle = "Body Soul Mind",
    defaultDescription = "Ganzheitliche Begleitung für Körper, Geist und Wohlbefinden.",
    defaultOgImage = "/og-default.jpg",
}) {
    const metaTitle = seo?.metaTitle || title || defaultTitle;
    const metaDescription = seo?.metaDescription || description || defaultDescription;
    const noIndex = seo?.noIndex || false;

    let ogImage = defaultOgImage;

    if (seo?.ogImage?.asset?.url) {
        ogImage = seo.ogImage.asset.url;
    }

    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    const normalizedPath = pathname ? (pathname.startsWith("/") ? pathname : `/${pathname}`) : "";
    const canonical = `${normalizedBaseUrl}${normalizedPath}`;

    const fullTitle =
        metaTitle === defaultTitle || metaTitle.includes(siteName) ? metaTitle : `${metaTitle} | ${siteName}`;

    return {
        title: fullTitle,
        description: metaDescription,

        alternates: {
            canonical,
        },

        robots: noIndex
            ? {
                  index: false,
                  follow: false,
              }
            : {
                  index: true,
                  follow: true,
              },

        openGraph: {
            title: fullTitle,
            description: metaDescription,
            url: canonical,
            siteName,
            type: "website",
            images: [
                {
                    url: ogImage.startsWith("http") ? ogImage : `${normalizedBaseUrl}${ogImage}`,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description: metaDescription,
            images: [ogImage.startsWith("http") ? ogImage : `${normalizedBaseUrl}${ogImage}`],
        },
    };
}
