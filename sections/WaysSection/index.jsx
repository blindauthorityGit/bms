import React from "react";

function resolveHref(link) {
    if (!link) return null;
    if (link.type === "external") return link.external || null;
    return link.internal || null;
}

export default function WaysSection({ data, className = "" }) {
    if (!data) return null;

    const highlightColor = data.highlightColor || "#BE1622";

    return (
        <section className={`relative w-full bg-white ${className}`}>
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:py-24 lg:px-10">
                {/* Headline */}
                {(data.headlinePrefix || data.headlineHighlight || data.headlineSuffix) && (
                    <div className="mx-auto max-w-[980px] text-center">
                        <h2 className="font-body text-5xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                            {data.headlinePrefix ? <span>{data.headlinePrefix} </span> : null}
                            {data.headlineHighlight ? (
                                <span className="font-headline font-semibold" style={{ color: highlightColor }}>
                                    {data.headlineHighlight}
                                </span>
                            ) : null}
                            {data.headlineSuffix ? <span> {data.headlineSuffix}</span> : null}
                        </h2>

                        {data.intro ? (
                            <p className="mx-auto mt-8 max-w-[80ch] text-sm leading-relaxed text-neutral-700 md:text-base">
                                {data.intro}
                            </p>
                        ) : null}
                    </div>
                )}

                {/* Cards */}
                {Array.isArray(data.items) && data.items.length ? (
                    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-10">
                        {data.items.map((item, idx) => {
                            const href = resolveHref(item.link);
                            const iconUrl = item?.icon?.asset?.url;

                            const CardTag = href ? "a" : "div";

                            return (
                                <CardTag
                                    key={`${item.title}-${idx}`}
                                    href={href || undefined}
                                    className={[
                                        "group block rounded-[44px] border border-neutral-300 bg-white",
                                        "px-10 py-12 text-center",
                                        "transition hover:border-neutral-500 hover:shadow-sm",
                                        href ? "focus:outline-none focus:ring-2 focus:ring-black/20" : "",
                                    ].join(" ")}
                                >
                                    {/* Icon */}
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center">
                                        {iconUrl ? (
                                            <img
                                                src={iconUrl}
                                                alt={item?.icon?.alt || item.title || ""}
                                                className="h-12 w-12 object-contain"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-neutral-100" />
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="mt-8 font-headline text-3xl  leading-tight text-neutral-900">
                                        {item.title}
                                    </h3>

                                    {/* Desc */}
                                    {item.description ? (
                                        <p className="mx-auto mt-6 max-w-[40ch] text-sm leading-relaxed text-neutral-600 md:text-base">
                                            {item.description}
                                        </p>
                                    ) : null}
                                </CardTag>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
