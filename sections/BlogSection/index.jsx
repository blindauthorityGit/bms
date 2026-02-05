import React from "react";

const BG = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" }).format(
            new Date(dateStr),
        );
    } catch {
        return "";
    }
}

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

export default function BlogSection({ data }) {
    if (!data) return null;

    const bgClass = BG[data.background] || BG.white;
    const posts = Array.isArray(data.posts) ? data.posts : [];
    if (!posts.length) return null;

    const href = resolveHref(data.buttonLink);

    return (
        <section className={`relative w-full ${bgClass} py-20`}>
            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                {/* Headline */}
                <h2 className="text-center text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                    <span className="font-headline font-semibold text-primary">{data.headlineHighlight}</span>{" "}
                    <span>
                        {data.headlinePrefix ? `${data.headlinePrefix} ` : ""}
                        {data.headlineSuffix || ""}
                    </span>
                </h2>

                {/* Grid */}
                <div className="mt-16 grid gap-12 lg:grid-cols-2">
                    {posts.map((p) => {
                        const imgUrl = p?.coverImage?.asset?.url;
                        const cat = Array.isArray(p?.categories) && p.categories.length ? p.categories[0] : null;

                        return (
                            <article key={p._id} className="mx-auto w-full max-w-[640px]">
                                {/* Image */}
                                <div className="relative overflow-hidden bg-white">
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt={p?.coverImage?.alt || p?.title || ""}
                                            className="h-auto w-full object-cover lg:max-h-[640px]"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="aspect-[16/9] w-full bg-neutral-200" />
                                    )}

                                    {/* Category badge (optional) */}
                                    {cat?.title ? (
                                        <div className="absolute left-6 top-6 rounded-full bg-[#B21F24] px-4 py-1 text-xs font-semibold text-white">
                                            {cat.title}
                                        </div>
                                    ) : null}
                                </div>

                                {/* Meta */}
                                <div className="mt-4 text-center text-xs text-neutral-500">
                                    {formatDate(p.publishedAt)}
                                    {p.readingTime ? ` • ${p.readingTime} Min Lesezeit` : ""}
                                </div>

                                {/* Title */}
                                <h3 className="mt-4 text-center font-headline text-2xl font-semibold text-neutral-900 md:text-3xl">
                                    {p.title}
                                </h3>

                                {/* Excerpt */}
                                {p.excerpt ? (
                                    <p className="mt-3 text-center text-sm leading-relaxed text-neutral-600 md:text-base">
                                        {p.excerpt}
                                    </p>
                                ) : null}

                                {/* Link */}
                                <div className="mt-6 text-center">
                                    <a
                                        href={`/wissen/${p.slug}`}
                                        className="text-sm text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-700"
                                    >
                                        Mehr lesen
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Button */}
                {data.buttonText ? (
                    <div className="mt-14 flex justify-center">
                        <a
                            href={href}
                            className="inline-flex items-center justify-center bg-[#B21F24] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                        >
                            {data.buttonText}
                        </a>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
