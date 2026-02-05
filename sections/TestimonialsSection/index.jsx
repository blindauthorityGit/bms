"use client";

import React from "react";

const BG = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
};

function Stars({ value = 5 }) {
    const v = Math.max(0, Math.min(5, Number(value) || 0));
    return (
        <div className="mt-4 flex items-center justify-center gap-1" aria-label={`${v} von 5 Sternen`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-lg ${i < v ? "text-[#D9A019]" : "text-neutral-300"}`}>
                    ★
                </span>
            ))}
        </div>
    );
}

function InitialsBadge({ initials = "?" }) {
    return (
        <div className="absolute -top-9 left-1/2 z-10 h-20 w-20 -translate-x-1/2 rounded-full bg-white shadow-md ring-1 ring-black/10">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-xl font-semibold text-neutral-700">
                {String(initials).slice(0, 3).toUpperCase()}
            </div>
        </div>
    );
}

export default function TestimonialsSection({ data, className = "" }) {
    const items = data?.items || [];
    if (!items.length) return null;

    const isSingle = items.length === 1;
    const bgClass = BG[data?.background] || BG.white;

    // Overlap nach oben, damit der BG unter das Bild drüber “reinläuft”
    // -> kannst du je nach Bedarf anpassen
    const overlapTop = true;
    const overlapAmount = "lg:-mt-32"; // zieht Background hoch
    const overlapComp = "lg:pt-32"; // kompensiert, damit Content nicht nach oben rutscht

    return (
        <section className={["relative w-full py-20", bgClass, overlapTop ? overlapAmount : "", className].join(" ")}>
            <div className={["mx-auto w-full max-w-[1440px] px-6 lg:px-10", overlapTop ? overlapComp : ""].join(" ")}>
                {/* Headline */}
                <h2 className="text-center text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                    <span className="font-headline font-semibold text-primary">{data.headlinePrefix}</span>{" "}
                    <span>
                        {data.headlineHighlight} {data.headlineSuffix}
                    </span>
                </h2>

                <div
                    className={[
                        "mt-16 grid gap-10",
                        isSingle ? "grid-cols-1 place-items-center" : "grid-cols-1 lg:grid-cols-2",
                    ].join(" ")}
                >
                    {items.map((t) => {
                        const snip = t.snippet; // (so wie du’s gerade verwendest)
                        const program = snip?.program || t.defaultProgram;

                        return (
                            <article
                                key={t._id}
                                className={[
                                    "relative mx-auto w-full",
                                    isSingle ? "max-w-[640px]" : "max-w-[520px]",
                                ].join(" ")}
                            >
                                <div className="relative rounded-[32px] border border-neutral-700/60 bg-white px-10 pb-12 pt-16">
                                    <InitialsBadge initials={t.initials} />

                                    {program ? (
                                        <div className="text-center text-xs uppercase tracking-widest text-neutral-500">
                                            {program}
                                        </div>
                                    ) : null}

                                    {snip?.quote ? (
                                        <h3 className="mt-6 text-center text-xl font-semibold text-neutral-900">
                                            „{snip.quote}“
                                        </h3>
                                    ) : null}

                                    {snip?.text ? (
                                        <p className="mt-4 text-center text-sm leading-relaxed text-neutral-600">
                                            {snip.text}
                                        </p>
                                    ) : null}

                                    <div className="mt-10 text-center text-xl font-semibold text-neutral-900">
                                        {t.name}
                                    </div>

                                    <Stars value={snip?.rating ?? 5} />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
