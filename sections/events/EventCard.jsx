"use client";

import React from "react";
import Link from "next/link";

function formatEventMeta(nextDate) {
    const start = nextDate?.start;
    if (!start) return "";

    try {
        const d = new Date(start);

        const monthYear = new Intl.DateTimeFormat("de-DE", {
            month: "long",
            year: "numeric",
        }).format(d);

        const time = new Intl.DateTimeFormat("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);

        return `${monthYear} · Beginn ${time}`;
    } catch {
        return "";
    }
}

export default function EventCard({ event }) {
    const href = `/events/${event.slug}`;
    const imgUrl = event?.coverImage?.asset?.url;

    const badgeText = event?.categoryTitle || (typeof event?.category === "string" ? event.category : null);
    const meta = formatEventMeta(event?.nextDate);

    return (
        <article className="text-center">
            <Link href={href} className="group block">
                {/* Image (fixed portrait ratio + centered crop) */}
                <div className="relative mx-auto w-full overflow-hidden bg-neutral-100 aspect-[4/5]">
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={event?.coverImage?.alt || event?.title || ""}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-200" />
                    )}

                    {/* Badge */}
                    {badgeText ? (
                        <div className="absolute left-5 top-5">
                            <span className="inline-flex items-center rounded-full bg-[#BE1622] px-3 py-1 text-[11px] font-semibold text-white">
                                {badgeText}
                            </span>
                        </div>
                    ) : null}
                </div>

                {/* Meta */}
                {meta ? <div className="mt-6 text-[11px] text-neutral-500">{meta}</div> : null}

                {/* Title */}
                <h2 className="mt-3 text-2xl font-semibold text-neutral-900 md:text-3xl">{event.title}</h2>

                {/* Excerpt */}
                {event.excerpt ? (
                    <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-neutral-700">
                        {event.excerpt}
                    </p>
                ) : null}

                {/* Read more */}
                <div className="mt-6">
                    <span className="text-sm underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
                        Mehr lesen
                    </span>
                </div>
            </Link>
        </article>
    );
}
