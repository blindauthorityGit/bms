import React from "react";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { sanityClient } from "@/client";
import { EVENT_DETAIL_QUERY } from "@/queries";

import EventDates from "@/sections/events/EventDates";
import EventGallery from "@/sections/events/EventGallery";

export const revalidate = 60;

function resolveBadgeText(data) {
    if (data?.categoryTitle) return data.categoryTitle;
    if (typeof data?.category === "string") return data.category;
    return null;
}

function resolveUrl(link) {
    if (!link) return null;
    if (typeof link === "string") return link;

    if (link.type === "external") return link.external || null;

    // internal kann bei dir ein string sein (z.B. "/kontakt?...") oder ein ref – je nach schema
    if (typeof link.internal === "string") return link.internal;

    // optional: wenn du internalRef benutzt (nur falls du das wirklich so speicherst)
    if (link.internalRef?.slug?.current) return `/${link.internalRef.slug.current}`;

    return null;
}

const portableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="mt-10 text-3xl font-headline font-semibold text-neutral-900 md:text-4xl">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-8 text-2xl font-headline font-semibold text-neutral-900 md:text-3xl">{children}</h3>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mt-8 rounded-[22px] border border-neutral-200 bg-neutral-50 px-6 py-6 text-neutral-800">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => <p className="mt-5 leading-relaxed text-neutral-700">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>,
        number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-neutral-700">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const href = value?.href || "#";
            const isExternal = href?.startsWith("http");
            return (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
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
                <div className="mt-10 overflow-hidden rounded-[22px] bg-neutral-100">
                    <img src={url} alt={value?.alt || ""} className="h-auto w-full object-cover" loading="lazy" />
                </div>
            );
        },
    },
};

export default async function Page({ params }) {
    const { slug } = await params; // ✅ Next 15: params ist Promise

    if (!slug) notFound();

    const data = await sanityClient.fetch(EVENT_DETAIL_QUERY, { slug });

    if (!data) notFound();
    console.log(data);
    const coverUrl = data?.coverImage?.asset?.url;
    const badgeText = resolveBadgeText(data);

    const signupText = data?.signup?.buttonText || "Anmelden";
    const signupHref = resolveUrl(data?.signup?.buttonLink);

    // Fallback Button (für Dates + CTAs)
    const fallbackButton = {
        text: signupText,
        link: signupHref,
    };

    return (
        <main>
            {/* HERO */}
            {/* HERO */}
            <section className="relative w-full bg-white">
                <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-10">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* LEFT: Title + Excerpt */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                                {data.title}
                            </h1>

                            {data.excerpt ? (
                                <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-neutral-700 md:text-base lg:max-w-[60ch]">
                                    {data.excerpt}
                                </p>
                            ) : null}

                            {/* Optional: Button oben schon (wenn du willst) */}
                            {fallbackButton?.link ? (
                                <div className="mt-8 flex justify-center lg:justify-start">
                                    <a
                                        href={fallbackButton.link}
                                        className="inline-flex items-center justify-center rounded-full bg-[#BE1622] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                                    >
                                        {fallbackButton.text || "Anmelden"}
                                    </a>
                                </div>
                            ) : null}
                        </div>

                        {/* RIGHT: Cover */}
                        {coverUrl ? (
                            <div className="relative overflow-hidden rounded-[28px] bg-neutral-100">
                                {/* feste Ratio, damit Layout stabil bleibt */}
                                <div className="aspect-[4/3] w-full">
                                    <img
                                        src={coverUrl}
                                        alt={data?.coverImage?.alt || data?.title || ""}
                                        className="h-full w-full object-cover"
                                        loading="eager"
                                    />
                                </div>

                                {badgeText ? (
                                    <div className="absolute left-6 top-6">
                                        <span className="inline-flex items-center rounded-full bg-[#BE1622] px-4 py-1 text-xs font-semibold text-white">
                                            {badgeText}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>

                    {/* kleiner Spacer unter dem Hero */}
                    <div className="pb-10 pt-14" />
                </div>
            </section>

            {/* CONTENT */}
            <section className="relative w-full bg-white pb-24">
                <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                    <div className="mx-auto max-w-[900px]">
                        {/* Body */}
                        {Array.isArray(data.body) && data.body.length ? (
                            <div className="prose prose-neutral max-w-none">
                                <PortableText value={data.body} components={portableTextComponents} />
                            </div>
                        ) : null}

                        {/* Termine */}
                        <EventDates dates={data?.dates || []} price={data?.price} fallbackButton={fallbackButton} />

                        {/* Galerie */}
                        <EventGallery images={data?.gallery || []} />

                        {/* Bottom CTA (optional) */}
                        {/* {fallbackButton?.link ? (
                            <div className="mt-16 flex justify-center">
                                <a
                                    href={fallbackButton.link}
                                    className="inline-flex items-center justify-center rounded-full bg-[#BE1622] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                                >
                                    {fallbackButton.text || "Anmelden"}
                                </a>
                            </div>
                        ) : null} */}
                    </div>
                </div>
            </section>
        </main>
    );
}
