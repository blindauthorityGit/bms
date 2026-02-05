"use client";

import React from "react";

function formatDateRange(start, end) {
    if (!start) return "";
    try {
        const s = new Date(start);
        const e = end ? new Date(end) : null;

        const date = new Intl.DateTimeFormat("de-DE", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(s);

        const timeS = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(s);
        const timeE = e ? new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(e) : null;

        return `${date} · ${timeS}${timeE ? `–${timeE}` : ""}`;
    } catch {
        return "";
    }
}

function resolveUrl(link) {
    if (!link) return null;
    if (typeof link === "string") return link;
    if (link.type === "external") return link.external || null;
    return link.internal || null;
}

function formatPriceValue(p) {
    if (!p) return null;

    // global price object: {amount, currency, note}
    if (typeof p === "object" && p.amount != null) {
        const cur = p.currency || "EUR";
        const formatted = `${p.amount} ${cur}`;
        return p.note ? `${formatted} ${p.note}` : formatted;
    }

    // fallback if someone stored it as number/string
    if (typeof p === "number") return `${p} €`;
    if (typeof p === "string") return p;

    return null;
}

export default function EventDates({ dates = [], price, fallbackButton }) {
    if (!Array.isArray(dates) || !dates.length) return null;

    const globalPriceText = formatPriceValue(price);

    return (
        <section className="mt-16 rounded-[28px] bg-[#E2DADB]/25 px-8 py-10 md:px-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-headline font-semibold text-neutral-900 md:text-4xl">Termine</h2>

                {/* globaler Preis einmal oben anzeigen */}
                {globalPriceText ? (
                    <div className="text-sm text-neutral-700 md:text-base">
                        <span className="font-semibold text-neutral-900">Kosten:</span> {globalPriceText}
                    </div>
                ) : null}
            </div>

            <div className="mt-8 space-y-6">
                {dates.map((d) => {
                    const meta = formatDateRange(d.start, d.end);
                    const place = d.location ? ` · ${d.location}` : "";
                    const label = d.label ? d.label : null;
                    const note = d.note ? d.note : null;

                    // optional: per-date price override (falls du es später brauchst)
                    const perDatePriceText =
                        d.price != null ? `${d.price}${d.currency ? ` ${d.currency}` : " €"}` : null;

                    const bookingUrl = resolveUrl(d.bookingUrl) || resolveUrl(fallbackButton?.link);

                    return (
                        <div
                            key={d._key}
                            className="flex flex-col gap-4 rounded-[22px] border border-neutral-300 bg-white px-6 py-6 md:flex-row md:items-center md:justify-between"
                        >
                            <div className="min-w-0">
                                <div className="text-sm text-neutral-500">
                                    {meta}
                                    {place}
                                </div>

                                {label ? (
                                    <div className="mt-2 text-xl font-headline font-semibold text-neutral-900">
                                        {label}
                                    </div>
                                ) : null}

                                {/* nur zeigen, wenn pro Termin ein eigener Preis gesetzt wurde */}
                                {perDatePriceText ? (
                                    <div className="mt-2 text-sm text-neutral-700">Kosten: {perDatePriceText}</div>
                                ) : null}

                                {note ? (
                                    <div className="mt-2 text-sm leading-relaxed text-neutral-600">{note}</div>
                                ) : null}

                                {d.isSoldOut ? (
                                    <div className="mt-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                                        Ausgebucht
                                    </div>
                                ) : null}
                            </div>

                            {bookingUrl && !d.isSoldOut ? (
                                <div className="shrink-0">
                                    <a
                                        href={bookingUrl}
                                        className="inline-flex items-center justify-center rounded-full bg-[#BE1622] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                                    >
                                        {fallbackButton?.text || "Anmelden"}
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
