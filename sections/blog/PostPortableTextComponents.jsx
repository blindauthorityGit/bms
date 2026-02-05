// /sections/blog/PostPortableTextComponents.jsx
"use client";

import React from "react";
import PostIconBoxesBlock from "@/sections/blog/blocks/PostIconBoxesBlock";
import PostCalloutBlock from "@/sections/blog/blocks/PostCalloutBlock";

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

const pt = {
    block: {
        normal: ({ children }) => (
            <p className="mt-5 text-sm leading-relaxed text-neutral-700 md:text-base">{children}</p>
        ),
        h2: ({ children }) => (
            <h2 className="mt-14 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-10 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">{children}</h3>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mt-10 border-l-2 border-neutral-300 pl-6 text-neutral-700">{children}</blockquote>
        ),
    },

    list: {
        bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-5 text-neutral-700">{children}</ul>,
        number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-5 text-neutral-700">{children}</ol>,
    },

    marks: {
        link: ({ value, children }) => {
            const href = resolveHref(value);
            const blank = value?.blank;
            return (
                <a
                    href={href}
                    target={blank ? "_blank" : undefined}
                    rel={blank ? "noreferrer noopener" : undefined}
                    className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-800"
                >
                    {children}
                </a>
            );
        },
    },

    types: {
        image: ({ value }) => {
            const url = value?.asset?.url;
            if (!url) return null;
            return (
                <figure className="mt-10">
                    <img src={url} alt={value?.alt || ""} className="w-full object-cover" loading="lazy" />
                </figure>
            );
        },

        postIconBoxesBlock: ({ value }) => <PostIconBoxesBlock data={value} />,

        postCalloutBlock: ({ value }) => <PostCalloutBlock data={value} />,
    },
};

export default pt;
