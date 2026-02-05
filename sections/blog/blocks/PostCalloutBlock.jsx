// /sections/blog/blocks/PostCalloutBlock.jsx
"use client";
import React from "react";

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

const BG = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
    primary: "bg-[#BE1622]/10",
};

export default function PostCalloutBlock({ data }) {
    if (!data) return null;

    const bg = BG[data.background] || BG.offwhite;
    const href = resolveHref(data.buttonLink);

    return (
        <section className={`mt-16 ${bg}`}>
            <div className="mx-auto w-full max-w-[1100px] px-6 py-14 lg:px-10">
                {data.headline ? (
                    <h3 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        {data.headline}
                    </h3>
                ) : null}

                {data.text ? <p className="mt-6 max-w-[80ch] text-neutral-700">{data.text}</p> : null}

                {data.buttonText && data.buttonLink ? (
                    <div className="mt-10">
                        <a
                            href={href}
                            className="inline-flex items-center justify-center bg-[#B21F24] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                        >
                            {data.buttonText}
                        </a>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
