import React from "react";

const BG_MAP = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
};

const WIDTH_MAP = {
    container: "max-w-[1440px]",
    narrow: "max-w-[1100px]",
};

const PADY_MAP = {
    none: "py-0",
    sm: "py-8 md:py-10",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
};

export default function DecoImageSection({ data, className = "" }) {
    const url = data?.image?.asset?.url;
    if (!url) return null;

    const bg = BG_MAP[data.background] || BG_MAP.white;
    const maxW = WIDTH_MAP[data.maxWidth] || WIDTH_MAP.container;
    const pady = PADY_MAP[data.paddingY] || PADY_MAP.md;

    const dims = data.image.asset.metadata?.dimensions;
    const alt = data.alt || data.caption || "";

    return (
        <section className={`relative w-full  ${className}`}>
            <div className={`mx-auto w-full ${maxW} px-6 lg:px-10 ${pady}`}>
                <figure>
                    <img
                        src={url}
                        alt={alt}
                        loading="lazy"
                        className="h-auto w-full object-cover"
                        width={dims?.width}
                        height={dims?.height}
                    />
                    {data.caption ? (
                        <figcaption className="mt-3 text-xs text-neutral-500">{data.caption}</figcaption>
                    ) : null}
                </figure>
            </div>
        </section>
    );
}
