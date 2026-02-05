import React from "react";
import { PortableText } from "@portabletext/react";

function resolveHref(link) {
    if (!link) return null;

    if (link.type === "external") {
        return link.external ? link.external : null;
    }

    return link.internal ? link.internal : null;
}

const BG_MAP = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
};

function getImageOffset(offset) {
    if (offset === "down") return "lg:translate-y-16";
    if (offset === "up") return "lg:-translate-y-16";
    return "";
}

function getSectionPad(offset) {
    if (offset === "down") return "lg:pb-10";
    if (offset === "up") return "lg:pt-10";
    return "";
}

function getNextSectionPull(offset) {
    if (offset === "down") return "lg:-mt-16";
    if (offset === "up") return "lg:mt-16";
    return "";
}

const ptComponents = {
    block: {
        normal: ({ children }) => (
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">{children}</p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="mt-4 list-disc pl-5 text-sm leading-relaxed text-neutral-700 md:text-base">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="mt-4 list-decimal pl-5 text-sm leading-relaxed text-neutral-700 md:text-base">{children}</ol>
        ),
    },
    marks: {
        link: ({ value, children }) => {
            const href = value?.href || "#";
            const blank = value?.blank;
            return (
                <a
                    href={href}
                    target={blank ? "_blank" : undefined}
                    rel={blank ? "noreferrer noopener" : undefined}
                    className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-700"
                >
                    {children}
                </a>
            );
        },
    },
};

export default function TextImageSection({ data, className = "" }) {
    if (!data) return null;

    const bgClass = BG_MAP[data.background] || BG_MAP.white;
    const highlightColor = data.highlightColor || "#BE1622";
    const href = resolveHref(data.buttonLink);
    const hasButton = Boolean(data.showButton && data.buttonText && href);

    console.log(hasButton);

    const imgUrl = data?.image?.asset?.url;

    const imageOffsetClass = getImageOffset(data.offset);
    const sectionPadClass = getSectionPad(data.offset);
    const nextSectionPullClass = getNextSectionPull(data.offset);

    // ✅ ORDER
    // default: imageRight (text left, image right)
    const isImageLeft = data.order === "imageLeft";
    const textColClass = isImageLeft ? "lg:order-2" : "lg:order-1";
    const imgColClass = isImageLeft ? "lg:order-1" : "lg:order-2";

    return (
        <>
            <section className={`relative w-full ${bgClass} ${className}`}>
                <div className={`mx-auto w-full max-w-[1440px] px-6 py-16 md:py-16 lg:px-10 ${sectionPadClass}`}>
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* TEXT */}
                        <div className={textColClass}>
                            {data.headlinePrefix || data.headlineHighlight || data.headlineSuffix ? (
                                <h2 className="text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                                    {data.headlinePrefix ? <span className="block">{data.headlinePrefix}</span> : null}

                                    {data.headlineHighlight ? (
                                        <span
                                            className="block font-headline font-semibold text-primary"
                                            style={{ color: highlightColor }}
                                        >
                                            {data.headlineHighlight}
                                        </span>
                                    ) : null}

                                    {data.headlineSuffix ? (
                                        <span className="mt-1 block">{data.headlineSuffix}</span>
                                    ) : null}
                                </h2>
                            ) : null}

                            {Array.isArray(data.description) ? (
                                <div className="mt-12 max-w-[66ch]">
                                    <PortableText value={data.description} components={ptComponents} />
                                </div>
                            ) : null}

                            {hasButton ? (
                                <div className="mt-16">
                                    <a
                                        href={href}
                                        className="inline-flex items-center justify-center bg-[#B21F24] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                                    >
                                        {data.buttonText}
                                    </a>
                                </div>
                            ) : null}
                        </div>

                        {/* IMAGE */}
                        <div className={`${imgColClass} relative z-10 transform-gpu ${imageOffsetClass}`}>
                            <div className="mx-auto w-full max-w-[560px]">
                                <div className="relative overflow-hidden bg-white">
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt={data.imageAlt || ""}
                                            className="h-auto w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="aspect-[4/5] w-full bg-neutral-200" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {data.offset === "down" ? <div className={`relative z-0 ${nextSectionPullClass}`} /> : null}
        </>
    );
}
